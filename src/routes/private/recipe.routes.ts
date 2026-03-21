import { Elysia, t } from "elysia";
import { t as translate } from "../../plugins/i18n";
import { HttpStatus } from "../../types";
import { clerkPlugin } from "elysia-clerk";
import {
    createRecipe,
    deleteRecipe,
    updateRecipe,
} from "../../services/recipe.services";

const sourceTypeSchema = t.Optional(
    t.Union([ t.Literal("MANUAL"), t.Literal("IMPORTED"), t.Literal("AI_GENERATED") ]),
);

const locale = (req: Request) =>
    req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ?? "vi";

export const privateRecipeRoutes = new Elysia({ prefix: "v1/recipes" })
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
    // Tạo mới recipe (POST)
    .post("/", async ({ body, set, request }) => {
        try {
            const data = body as {
                userId: string; recipesName: string; description?: string;
                imageRecipe?: string; totalTime?: number; calories?: number;
                protein?: number; carbs?: number; fats?: number;
                sourceType?: "MANUAL" | "IMPORTED" | "AI_GENERATED"; numberOfServes?: number;
            };

            if (!data.recipesName.trim()) {
                set.status = 400;
                return { success: false, message: translate("errors.recipe.name_required", locale(request)) };
            }

            const newRecipe = await createRecipe(data);
            set.status = 201;
            return { success: true, message: translate("success.created", locale(request)), data: newRecipe };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.recipe.create_failed", locale(request)) };
        }
    }, {
        body: t.Object({
            userId: t.String(), recipesName: t.String(), description: t.Optional(t.String()),
            imageRecipe: t.Optional(t.String()), totalTime: t.Optional(t.Number()),
            calories: t.Optional(t.Number()), protein: t.Optional(t.Number()),
            carbs: t.Optional(t.Number()), fats: t.Optional(t.Number()),
            sourceType: sourceTypeSchema, numberOfServes: t.Optional(t.Number()),
        }),
        detail: { tags: ["Private"], summary: "Create new recipe" }
    })

    // Cập nhật recipe (PUT)
    .put("/:id", async ({ params: { id }, body, set, request }) => {
        try {
            const data = body as {
                userId?: string; recipesName?: string; description?: string;
                imageRecipe?: string; totalTime?: number; calories?: number;
                protein?: number; carbs?: number; fats?: number;
                sourceType?: "MANUAL" | "IMPORTED" | "AI_GENERATED"; numberOfServes?: number;
            };

            if (data.recipesName !== undefined && !data.recipesName.trim()) {
                set.status = 400;
                return { success: false, message: translate("errors.recipe.name_required", locale(request)) };
            }

            const hasDataToUpdate = Object.values(data).some((value) => value !== undefined);
            if (!hasDataToUpdate) {
                set.status = 400;
                return { success: false, message: translate("errors.no_fields_to_update", locale(request)) };
            }

            const updatedRecipe = await updateRecipe(id, data);
            return { success: true, message: translate("success.updated", locale(request)), data: updatedRecipe };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.recipe.not_found_update", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
        body: t.Object({
            userId: t.Optional(t.String()), recipesName: t.Optional(t.String()), description: t.Optional(t.String()),
            imageRecipe: t.Optional(t.String()), totalTime: t.Optional(t.Number()),
            calories: t.Optional(t.Number()), protein: t.Optional(t.Number()),
            carbs: t.Optional(t.Number()), fats: t.Optional(t.Number()),
            sourceType: sourceTypeSchema, numberOfServes: t.Optional(t.Number()),
        }),
        detail: { tags: ["Private"], summary: "Update recipe" }
    })

    // Xóa recipe (DELETE)
    .delete("/:id", async ({ params: { id }, set, request }) => {
        try {
            await deleteRecipe(id);
            return { success: true, message: translate("success.deleted", locale(request)) };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.recipe.not_found_delete", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
        detail: { tags: ["Private"], summary: "Delete recipe" }
    });