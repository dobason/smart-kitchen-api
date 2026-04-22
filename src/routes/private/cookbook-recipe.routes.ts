import { Elysia, t } from "elysia";
import { t as translate } from "../../plugins/i18n";
import { HttpStatus } from "../../types";
import { clerkPlugin } from "elysia-clerk";
import {
    createCookbookRecipe,
    deleteCookbookRecipe,
    getAllCookbookRecipes,
    getCookbookRecipeById,
    updateCookbookRecipe,
} from "../../services/cookbook-recipe.services";

const locale = (req: Request) =>
    req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ?? "vi";

export const cookbookRecipeRoutes = new Elysia({ prefix: "v1/cookbook-recipes" })
    .use(clerkPlugin())
    .onBeforeHandle(({ auth, set, request }) => {
        const { userId } = auth();
        if (!userId) {
            set.status = HttpStatus.UNAUTHORIZED;
            return {
                success: false,
                message: translate("errors.unauthorized", locale(request))
            };
        }
    })
    .resolve(({ auth }) => {
        const { userId } = auth();
        return { userId: userId as string };
    })
    // Lấy tất cả cookbook recipes (GET)
    .get("/", async ({ query, userId, set, request }) => {
        try {
            const cookbookRecipes = await getAllCookbookRecipes({
                userId,
                recipeId: query.recipeId,
                cookbookId: query.cookbookId,
            });
            return { success: true, data: cookbookRecipes };
        } catch (error) {
            set.status = HttpStatus.INTERNAL_SERVER_ERROR;
            return { success: false, message: translate("errors.cookbook_recipe.fetch", locale(request)) };
        }
    }, {
        query: t.Object({
            recipeId: t.Optional(t.Numeric()),
            cookbookId: t.Optional(t.Numeric()),
        }),
        detail: { tags: ["Private"], summary: "Get all recipes in cookbook" }
    })

    // Lấy chi tiết cookbook recipe (GET)
    .get("/:recipeId/:cookbookId", async ({ params: { recipeId, cookbookId }, userId, set, request }) => {
        try {
            const cookbookRecipe = await getCookbookRecipeById(recipeId, cookbookId, userId);
            if (!cookbookRecipe) {
                set.status = HttpStatus.NOT_FOUND;
                return { success: false, message: translate("errors.cookbook_recipe.not_found", locale(request)) };
            }
            return { success: true, data: cookbookRecipe };
        } catch (error) {
            set.status = HttpStatus.INTERNAL_SERVER_ERROR;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({
            recipeId: t.Numeric(),
            cookbookId: t.Numeric(),
        }),
        detail: { tags: ["Private"], summary: "Get recipe in cookbook by id" }
    })

    // Tạo mới cookbook recipe (POST)
    .post("/", async ({ body, userId, set, request }) => {
        try {
            const data = body as { recipeId: number; cookbookId: number };
            const newCookbookRecipe = await createCookbookRecipe(data, userId);
            set.status = 201;
            return { success: true, message: translate("success.created", locale(request)), data: newCookbookRecipe };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.cookbook_recipe.not_found", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.cookbook_recipe.create_failed", locale(request)) };
        }
    }, {
        body: t.Object({
            recipeId: t.Number(),
            cookbookId: t.Number(),
        }),
        detail: { tags: ["Private"], summary: "Create new recipe in cookbook" }
    })

    // Cập nhật cookbook recipe (PUT)
    .put("/:recipeId/:cookbookId", async ({ params: { recipeId, cookbookId }, body, userId, set, request }) => {
        try {
            const data = body as { recipeId?: number; cookbookId?: number };
            const hasDataToUpdate = Object.values(data).some((value) => value !== undefined);

            if (!hasDataToUpdate) {
                set.status = 400;
                return { success: false, message: translate("errors.no_fields_to_update", locale(request)) };
            }

            const updatedCookbookRecipe = await updateCookbookRecipe(recipeId, cookbookId, userId, data);
            return { success: true, message: translate("success.updated", locale(request)), data: updatedCookbookRecipe };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.cookbook_recipe.not_found_update", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({
            recipeId: t.Numeric(),
            cookbookId: t.Numeric(),
        }),
        body: t.Object({
            recipeId: t.Optional(t.Number()),
            cookbookId: t.Optional(t.Number()),
        }),
        detail: { tags: ["Private"], summary: "Update recipe in cookbook" }
    })

    // Xóa cookbook recipe (DELETE)
    .delete("/:cookbookId/:recipeId", async ({ params: { cookbookId, recipeId }, userId, set, request }) => {
        try {
            await deleteCookbookRecipe(recipeId, cookbookId, userId);
            return { success: true, message: "Deleted" };
        } catch (error: any) {
            if (error?.code === 'P2025') {
                set.status = 404;
                return { success: false, message: "Not found" };
            }
            set.status = 500;
            return { success: false, message: "Error" };
        }
    }, {
        params: t.Object({ cookbookId: t.Numeric(), recipeId: t.Numeric() }),
    })
