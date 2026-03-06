import { Elysia, t } from "elysia";
import {
    getAllCookbooks,
    getCookbookById,
    createCookbook,
    updateCookbook,
    deleteCookbook,
} from "../services/cookbook.services";

export const cookbookRoutes = new Elysia({ prefix: "v1/cookbooks" })

    // 1. Lấy tất cả (GET)
    .get("/", async ({ set }) => {
        try {
            const cookbooks = await getAllCookbooks();
            return { success: true, data: cookbooks };
        } catch (error) {
            set.status = 500;
            return { success: false, message: "Lỗi khi lấy danh sách", error: String(error) };
        }
    })

    // 2. Lấy chi tiết (GET)
    .get("/:id", async ({ params: { id }, set }) => {
        try {
            const cookbook = await getCookbookById(id);
            if (!cookbook) {
                set.status = 404;
                return { success: false, message: "Không tìm thấy công thức" };
            }
            return { success: true, data: cookbook };
        } catch (error) {
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống", error: String(error) };
        }
    }, {
        params: t.Object({ id: t.Numeric() })
    })

    // 3. Tạo mới (POST)
    .post("/", async ({ body, set }) => {
        try {
            const data = body as { title: string; description?: string };
            const newCookbook = await createCookbook(data);
            set.status = 201;
            return { success: true, message: "Tạo thành công", data: newCookbook };
        } catch (error) {
            set.status = 500;
            return { success: false, message: "Lỗi khi tạo", error: String(error) };
        }
    }, {
        body: t.Object({
            title: t.String({ error: "Tên công thức không được để trống" }),
            description: t.Optional(t.String()),
        })
    })

    // 4. Cập nhật (PUT)
    .put("/:id", async ({ params: { id }, body, set }) => {
        try {
            const data = body as { title?: string; description?: string };
            const updatedCookbook = await updateCookbook(id, data);
            return { success: true, message: "Cập nhật thành công", data: updatedCookbook };
        } catch (error) {
            set.status = 404;
            return { success: false, message: "Không tìm thấy công thức để cập nhật" };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
        body: t.Object({
            title: t.Optional(t.String()),
            description: t.Optional(t.String()),
        })
    })

    // 5. Xóa (DELETE)
    .delete("/:id", async ({ params: { id }, set }) => {
        try {
            await deleteCookbook(id);
            return { success: true, message: "Đã xóa công thức" };
        } catch (error) {
            set.status = 404;
            return { success: false, message: "Không tìm thấy công thức để xóa" };
        }
    }, {
        params: t.Object({ id: t.Numeric() })
    });