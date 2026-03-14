import { Elysia, t } from "elysia";
import {
    createIngredient,
    deleteIngredient,
    getAllIngredients,
    getIngredientById,
    updateIngredient,
} from "../services/ingredient.services";

export const ingredientRoutes = new Elysia({ prefix: "v1/ingredients" })

    // 1. Lấy tất cả ingredients (GET)
    .get("/", async ({ set }) => {
        try {
            const ingredients = await getAllIngredients();
            return { success: true, data: ingredients };
        } catch (error) {
            console.error("Lỗi khi lấy danh sách ingredients:", error);
            set.status = 500;
            return { success: false, message: "Lỗi khi lấy danh sách nguyên liệu" };
        }
    })

    // 2. Lấy chi tiết ingredient (GET)
    .get("/:id", async ({ params: { id }, set }) => {
        try {
            const ingredient = await getIngredientById(id);
            if (!ingredient) {
                set.status = 404;
                return { success: false, message: "Không tìm thấy ingredient" };
            }

            return { success: true, data: ingredient };
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết ingredient:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
    })

    // 3. Tạo mới ingredient (POST)
    .post("/", async ({ body, set }) => {
        try {
            const data = body as { name: string; icon?: string };

            if (!data.name.trim()) {
                set.status = 400;
                return { success: false, message: "Tên nguyên liệu không được để trống" };
            }

            const newIngredient = await createIngredient(data);
            set.status = 201;
            return { success: true, message: "Tạo thành công", data: newIngredient };
        } catch (error) {
            console.error("Lỗi khi tạo ingredient:", error);
            set.status = 500;
            return { success: false, message: "Lỗi khi tạo ingredient" };
        }
    }, {
        body: t.Object({
            name: t.String(),
            icon: t.Optional(t.String()),
        }),
    })

    // 4. Cập nhật ingredient (PUT)
    .put("/:id", async ({ params: { id }, body, set }) => {
        try {
            const data = body as { name?: string; icon?: string };

            if (data.name !== undefined && !data.name.trim()) {
                set.status = 400;
                return { success: false, message: "Tên nguyên liệu không được để trống" };
            }

            const hasDataToUpdate = Object.values(data).some((value) => value !== undefined);
            if (!hasDataToUpdate) {
                set.status = 400;
                return { success: false, message: "No fields to update" };
            }

            const updatedIngredient = await updateIngredient(id, data);
            return { success: true, message: "Cập nhật thành công", data: updatedIngredient };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: "Không tìm thấy ingredient để cập nhật" };
            }

            console.error("Lỗi khi cập nhật ingredient:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
        body: t.Object({
            name: t.Optional(t.String()),
            icon: t.Optional(t.String()),
        }),
    })

    // 5. Xóa ingredient (DELETE)
    .delete("/:id", async ({ params: { id }, set }) => {
        try {
            await deleteIngredient(id);
            return { success: true, message: "Đã xóa ingredient" };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: "Không tìm thấy ingredient để xóa" };
            }

            console.error("Lỗi khi xóa ingredient:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
    });