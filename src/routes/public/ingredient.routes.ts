import { Elysia, t } from "elysia";
import { t as translate } from "../../plugins/i18n"; 
import {
    getAllIngredients,
    getIngredientById,
} from "../../services/ingredient.services"; 

const locale = (req: Request) =>
    req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ?? "vi";

export const publicIngredientRoutes = new Elysia({ prefix: "v1/ingredients" })
    
    // Lấy tất cả ingredients (GET)
    .get("/", async ({ set, request }) => {
        try {
            const ingredients = await getAllIngredients();
            return { success: true, data: ingredients };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.ingredient.fetch", locale(request)) };
        }
    })

    // Lấy chi tiết ingredient (GET)
    .get("/:id", async ({ params: { id }, set, request }) => {
        try {
            const ingredient = await getIngredientById(id);
            if (!ingredient) {
                set.status = 404;
                return { success: false, message: translate("errors.ingredient.not_found", locale(request)) };
            }
            return { success: true, data: ingredient };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
    });