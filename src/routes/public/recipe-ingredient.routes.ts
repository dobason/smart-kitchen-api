import { Elysia, t } from "elysia";
import { t as translate } from "../../plugins/i18n";
import {
    getAllRecipeIngredients,
    getRecipeIngredientById,
} from "../../services/recipe-ingredient.services";

const locale = (req: Request) =>
    req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ?? "vi";

export const publicRecipeIngredientRoutes = new Elysia({ prefix: "v1/recipe-ingredients" })
    
    // Lấy tất cả recipe ingredients (GET)
    .get("/", async ({ query, set, request }) => {
        try {
            const recipeIngredients = await getAllRecipeIngredients({
                recipeId: query.recipeId,
                ingredientId: query.ingredientId,
            });
            return { success: true, data: recipeIngredients };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.recipe_ingredient.fetch", locale(request)) };
        }
    }, {
        query: t.Object({
            recipeId: t.Optional(t.Numeric()),
            ingredientId: t.Optional(t.Numeric()),
        }),
    })

    // Lấy chi tiết recipe ingredient (GET)
    .get("/:recipeId/:ingredientId", async ({ params: { recipeId, ingredientId }, set, request }) => {
        try {
            const recipeIngredient = await getRecipeIngredientById(recipeId, ingredientId);
            if (!recipeIngredient) {
                set.status = 404;
                return { success: false, message: translate("errors.recipe_ingredient.not_found", locale(request)) };
            }
            return { success: true, data: recipeIngredient };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({
            recipeId: t.Numeric(),
            ingredientId: t.Numeric(),
        }),
    });