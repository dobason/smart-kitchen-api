import { Elysia, t } from "elysia";
import { t as translate } from "../plugins/i18n";
import {
    createCookbookRecipe,
    deleteCookbookRecipe,
    getAllCookbookRecipes,
    getCookbookRecipeById,
    updateCookbookRecipe,
} from "../services/cookbook-recipe.services";

const locale = (req: Request) =>
    req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ?? "vi";

export const cookbookRecipeRoutes = new Elysia({ prefix: "v1/cookbook-recipes" })

    // 1. Lấy tất cả cookbook recipes (GET)
    .get("/", async ({ query, set, request }) => {
        try {
            const cookbookRecipes = await getAllCookbookRecipes({
                recipeId: query.recipeId,
                cookbookId: query.cookbookId,
            });
            return { success: true, data: cookbookRecipes };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.cookbook_recipe.fetch", locale(request)) };
        }
    }, {
        query: t.Object({
            recipeId: t.Optional(t.Numeric()),
            cookbookId: t.Optional(t.Numeric()),
        }),
    })

    // 2. Lấy chi tiết cookbook recipe (GET)
    .get("/:recipeId/:cookbookId", async ({ params: { recipeId, cookbookId }, set, request }) => {
        try {
            const cookbookRecipe = await getCookbookRecipeById(recipeId, cookbookId);
            if (!cookbookRecipe) {
                set.status = 404;
                return { success: false, message: translate("errors.cookbook_recipe.not_found", locale(request)) };
            }
            return { success: true, data: cookbookRecipe };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({
            recipeId: t.Numeric(),
            cookbookId: t.Numeric(),
        }),
    })

    // 3. Tạo mới cookbook recipe (POST)
    .post("/", async ({ body, set, request }) => {
        try {
            const data = body as { recipeId: number; cookbookId: number };
            const newCookbookRecipe = await createCookbookRecipe(data);
            set.status = 201;
            return { success: true, message: translate("success.created", locale(request)), data: newCookbookRecipe };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.cookbook_recipe.create_failed", locale(request)) };
        }
    }, {
        body: t.Object({
            recipeId: t.Number(),
            cookbookId: t.Number(),
        }),
    })

    // 4. Cập nhật cookbook recipe (PUT)
    .put("/:recipeId/:cookbookId", async ({ params: { recipeId, cookbookId }, body, set, request }) => {
        try {
            const data = body as { recipeId?: number; cookbookId?: number };
            const hasDataToUpdate = Object.values(data).some((value) => value !== undefined);

            if (!hasDataToUpdate) {
                set.status = 400;
                return { success: false, message: translate("errors.no_fields_to_update", locale(request)) };
            }

            const updatedCookbookRecipe = await updateCookbookRecipe(recipeId, cookbookId, data);
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
    })

    // 5. Xóa cookbook recipe (DELETE)
    .delete("/:recipeId/:cookbookId", async ({ params: { recipeId, cookbookId }, set, request }) => {
        try {
            await deleteCookbookRecipe(recipeId, cookbookId);
            return { success: true, message: translate("success.deleted", locale(request)) };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.cookbook_recipe.not_found_delete", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({
            recipeId: t.Numeric(),
            cookbookId: t.Numeric(),
        }),
    });
