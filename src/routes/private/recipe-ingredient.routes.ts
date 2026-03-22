import { Elysia, t } from "elysia";
import { t as translate } from "../../plugins/i18n";
<<<<<<< HEAD
=======
import { HttpStatus } from "../../types";
import { clerkPlugin } from "elysia-clerk";
>>>>>>> bd454b0064926beb13d19aaaf7085d867990532c
import {
    createRecipeIngredient,
    deleteRecipeIngredient,
    updateRecipeIngredient,
} from "../../services/recipe-ingredient.services";

const locale = (req: Request) =>
    req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ?? "vi";

export const privateRecipeIngredientRoutes = new Elysia({ prefix: "v1/recipe-ingredients" })
<<<<<<< HEAD
    
=======
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
>>>>>>> bd454b0064926beb13d19aaaf7085d867990532c
    // Tạo mới recipe ingredient (POST)
    .post("/", async ({ body, set, request }) => {
        try {
            const data = body as {
                recipeId: number;
                ingredientId: number;
                quantity?: number;
                unit?: string;
                note?: string;
            };
            const newRecipeIngredient = await createRecipeIngredient(data);
            set.status = 201;
            return { success: true, message: translate("success.created", locale(request)), data: newRecipeIngredient };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.recipe_ingredient.create_failed", locale(request)) };
        }
    }, {
        body: t.Object({
            recipeId: t.Number(),
            ingredientId: t.Number(),
            quantity: t.Optional(t.Number()),
            unit: t.Optional(t.String()),
            note: t.Optional(t.String()),
        }),
        detail: { tags: ["Private"], summary: "Create new ingredient in recipe" }
    })

    // Cập nhật recipe ingredient (PUT)
    .put("/:recipeId/:ingredientId", async ({ params: { recipeId, ingredientId }, body, set, request }) => {
        try {
            const data = body as {
                recipeId?: number;
                ingredientId?: number;
                quantity?: number;
                unit?: string;
                note?: string;
            };
            const hasDataToUpdate = Object.values(data).some((value) => value !== undefined);

            if (!hasDataToUpdate) {
                set.status = 400;
                return { success: false, message: translate("errors.no_fields_to_update", locale(request)) };
            }

            const updatedRecipeIngredient = await updateRecipeIngredient(recipeId, ingredientId, data);
            return { success: true, message: translate("success.updated", locale(request)), data: updatedRecipeIngredient };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.recipe_ingredient.not_found_update", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({
            recipeId: t.Numeric(),
            ingredientId: t.Numeric(),
        }),
        body: t.Object({
            recipeId: t.Optional(t.Number()),
            ingredientId: t.Optional(t.Number()),
            quantity: t.Optional(t.Number()),
            unit: t.Optional(t.String()),
            note: t.Optional(t.String()),
        }),
        detail: { tags: ["Private"], summary: "Update ingredient in recipe" }
    })

    // Xóa recipe ingredient (DELETE)
    .delete("/:recipeId/:ingredientId", async ({ params: { recipeId, ingredientId }, set, request }) => {
        try {
            await deleteRecipeIngredient(recipeId, ingredientId);
            return { success: true, message: translate("success.deleted", locale(request)) };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.recipe_ingredient.not_found_delete", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({
            recipeId: t.Numeric(),
            ingredientId: t.Numeric(),
        }),
<<<<<<< HEAD
=======
        detail: { tags: ["Private"], summary: "Delete ingredient in recipe" }
>>>>>>> bd454b0064926beb13d19aaaf7085d867990532c
    });