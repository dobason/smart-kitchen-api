import { Elysia, t } from "elysia";
import {
    createRecipeIngredient,
    deleteRecipeIngredient,
    getAllRecipeIngredients,
    getRecipeIngredientById,
    updateRecipeIngredient,
} from "../services/recipe-ingredient.services";

export const recipeIngredientRoutes = new Elysia({ prefix: "v1/recipe-ingredients" })

    // 1. Lấy tất cả recipe ingredients (GET)
    .get("/", async ({ query, set }) => {
        try {
            const recipeIngredients = await getAllRecipeIngredients({
                recipeId: query.recipeId,
                ingredientId: query.ingredientId,
            });
            return { success: true, data: recipeIngredients };
        } catch (error) {
            console.error("Lỗi khi lấy danh sách recipe ingredients:", error);
            set.status = 500;
            return { success: false, message: "Lỗi khi lấy danh sách recipe ingredient" };
        }
    }, {
        query: t.Object({
            recipeId: t.Optional(t.Numeric()),
            ingredientId: t.Optional(t.Numeric()),
        }),
    })

    // 2. Lấy chi tiết recipe ingredient (GET)
    .get("/:recipeId/:ingredientId", async ({ params: { recipeId, ingredientId }, set }) => {
        try {
            const recipeIngredient = await getRecipeIngredientById(recipeId, ingredientId);
            if (!recipeIngredient) {
                set.status = 404;
                return { success: false, message: "Không tìm thấy recipe ingredient" };
            }

            return { success: true, data: recipeIngredient };
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết recipe ingredient:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({
            recipeId: t.Numeric(),
            ingredientId: t.Numeric(),
        }),
    })

    // 3. Tạo mới recipe ingredient (POST)
    .post("/", async ({ body, set }) => {
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
            return { success: true, message: "Tạo thành công", data: newRecipeIngredient };
        } catch (error) {
            console.error("Lỗi khi tạo recipe ingredient:", error);
            set.status = 500;
            return { success: false, message: "Lỗi khi tạo recipe ingredient" };
        }
    }, {
        body: t.Object({
            recipeId: t.Number(),
            ingredientId: t.Number(),
            quantity: t.Optional(t.Number()),
            unit: t.Optional(t.String()),
            note: t.Optional(t.String()),
        }),
    })

    // 4. Cập nhật recipe ingredient (PUT)
    .put("/:recipeId/:ingredientId", async ({ params: { recipeId, ingredientId }, body, set }) => {
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
                return { success: false, message: "No fields to update" };
            }

            const updatedRecipeIngredient = await updateRecipeIngredient(recipeId, ingredientId, data);
            return { success: true, message: "Cập nhật thành công", data: updatedRecipeIngredient };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: "Không tìm thấy recipe ingredient để cập nhật" };
            }

            console.error("Lỗi khi cập nhật recipe ingredient:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
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
    })

    // 5. Xóa recipe ingredient (DELETE)
    .delete("/:recipeId/:ingredientId", async ({ params: { recipeId, ingredientId }, set }) => {
        try {
            await deleteRecipeIngredient(recipeId, ingredientId);
            return { success: true, message: "Đã xóa recipe ingredient" };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: "Không tìm thấy recipe ingredient để xóa" };
            }

            console.error("Lỗi khi xóa recipe ingredient:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({
            recipeId: t.Numeric(),
            ingredientId: t.Numeric(),
        }),
    });