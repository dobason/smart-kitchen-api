import { Elysia, t } from "elysia";
import { t as translate } from "../plugins/i18n";
import {
    createIngredient,
    deleteIngredient,
    getAllIngredients,
    getIngredientById,
    updateIngredient,
} from "../services/ingredient.services";

const locale = (req: Request) =>
    req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ?? "vi";

export const ingredientRoutes = new Elysia({ prefix: "v1/ingredients" })

    // 1. Lấy tất cả ingredients (GET)
    .get("/", async ({ set, request }) => {
        try {
            const ingredients = await getAllIngredients();
            return { success: true, data: ingredients };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.ingredient.fetch", locale(request)) };
        }
    })

    // 2. Lấy chi tiết ingredient (GET)
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
    })

    // 3. Tạo mới ingredient (POST)
    .post("/", async ({ body, set, request }) => {
        try {
            const data = body as { name: string; icon?: string };

            if (!data.name.trim()) {
                set.status = 400;
                return { success: false, message: translate("errors.ingredient.name_required", locale(request)) };
            }

            const newIngredient = await createIngredient(data);
            set.status = 201;
            return { success: true, message: translate("success.created", locale(request)), data: newIngredient };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.ingredient.create_failed", locale(request)) };
        }
    }, {
        body: t.Object({
            name: t.String(),
            icon: t.Optional(t.String()),
        }),
    })

    // 4. Cập nhật ingredient (PUT)
    .put("/:id", async ({ params: { id }, body, set, request }) => {
        try {
            const data = body as { name?: string; icon?: string };

            if (data.name !== undefined && !data.name.trim()) {
                set.status = 400;
                return { success: false, message: translate("errors.ingredient.name_required", locale(request)) };
            }

            const hasDataToUpdate = Object.values(data).some((value) => value !== undefined);
            if (!hasDataToUpdate) {
                set.status = 400;
                return { success: false, message: translate("errors.no_fields_to_update", locale(request)) };
            }

            const updatedIngredient = await updateIngredient(id, data);
            return { success: true, message: translate("success.updated", locale(request)), data: updatedIngredient };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.ingredient.not_found_update", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
        body: t.Object({
            name: t.Optional(t.String()),
            icon: t.Optional(t.String()),
        }),
    })

    // 5. Xóa ingredient (DELETE)
    .delete("/:id", async ({ params: { id }, set, request }) => {
        try {
            await deleteIngredient(id);
            return { success: true, message: translate("success.deleted", locale(request)) };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.ingredient.not_found_delete", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
    });
