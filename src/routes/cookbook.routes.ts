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
            console.error("Lỗi khi lấy danh sách cookbooks:", error);
            set.status = 500;
            return { success: false, message: "Lỗi khi lấy danh sách" };
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
            console.error("Lỗi khi lấy chi tiết cookbook:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({ id: t.Numeric() })
    })

    // 3. Tạo mới (POST)
    .post("/", async ({ body, set }) => {
        try {
            const data = body as { name: string; userId: number };

            if (!data.name?.trim()) {
                set.status = 400;
                return { success: false, message: "Tên công thức không được để trống" };
            }

            const newCookbook = await createCookbook({ name: data.name.trim(), userId: data.userId });
            set.status = 201;
            return { success: true, message: "Tạo thành công", data: newCookbook };
        } catch (error) {
            console.error("Lỗi khi tạo cookbook:", error);
            set.status = 500;
            return { success: false, message: "Lỗi khi tạo" };
        }
    }, {
        body: t.Object({
            name: t.String(),
            userId: t.Number()
        })
    })

    // 4. Cập nhật (PUT)
    .put("/:id", async ({ params: { id }, body, set }) => {
        try {
            const data = body as { name?: string };

            if (!data.name?.trim()) {
                set.status = 400;
                return { success: false, message: "Tên công thức không được để trống" };
            }

            const updatedCookbook = await updateCookbook(id, { name: data.name.trim() });
            return { success: true, message: "Cập nhật thành công", data: updatedCookbook };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: "Không tìm thấy công thức để cập nhật" };
            }
            console.error("Lỗi khi cập nhật cookbook:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
        body: t.Object({
            name: t.Optional(t.String()),
        })
    })

    // 5. Xóa (DELETE)
    .delete("/:id", async ({ params: { id }, set }) => {
        try {
            await deleteCookbook(id);
            return { success: true, message: "Đã xóa công thức" };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: "Không tìm thấy công thức để xóa" };
            }
            console.error("Lỗi khi xóa cookbook:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({ id: t.Numeric() })
    });