import { Elysia, t } from "elysia";
import {
    createTag,
    deleteTag,
    getAllTags,
    getTagById,
    updateTag,
} from "../services/tag.services";

export const tagRoutes = new Elysia({ prefix: "v1/tags" })

    // 1. Lấy tất cả tags (GET)
    .get("/", async ({ set }) => {
        try {
            const tags = await getAllTags();
            return { success: true, data: tags };
        } catch (error) {
            console.error("Lỗi khi lấy danh sách tags:", error);
            set.status = 500;
            return { success: false, message: "Lỗi khi lấy danh sách tag" };
        }
    })

    // 2. Lấy chi tiết tag (GET)
    .get("/:id", async ({ params: { id }, set }) => {
        try {
            const tag = await getTagById(id);
            if (!tag) {
                set.status = 404;
                return { success: false, message: "Không tìm thấy tag" };
            }

            return { success: true, data: tag };
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết tag:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
    })

    // 3. Tạo mới tag (POST)
    .post("/", async ({ body, set }) => {
        try {
            const data = body as { name: string; category?: string };

            if (!data.name.trim()) {
                set.status = 400;
                return { success: false, message: "Tên tag không được để trống" };
            }

            const newTag = await createTag(data);
            set.status = 201;
            return { success: true, message: "Tạo thành công", data: newTag };
        } catch (error) {
            console.error("Lỗi khi tạo tag:", error);
            set.status = 500;
            return { success: false, message: "Lỗi khi tạo tag" };
        }
    }, {
        body: t.Object({
            name: t.String(),
            category: t.Optional(t.String()),
        }),
    })

    // 4. Cập nhật tag (PUT)
    .put("/:id", async ({ params: { id }, body, set }) => {
        try {
            const data = body as { name?: string; category?: string };

            if (data.name !== undefined && !data.name.trim()) {
                set.status = 400;
                return { success: false, message: "Tên tag không được để trống" };
            }

            const hasDataToUpdate = Object.values(data).some((value) => value !== undefined);
            if (!hasDataToUpdate) {
                set.status = 400;
                return { success: false, message: "No fields to update" };
            }

            const updatedTag = await updateTag(id, data);
            return { success: true, message: "Cập nhật thành công", data: updatedTag };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: "Không tìm thấy tag để cập nhật" };
            }

            console.error("Lỗi khi cập nhật tag:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
        body: t.Object({
            name: t.Optional(t.String()),
            category: t.Optional(t.String()),
        }),
    })

    // 5. Xóa tag (DELETE)
    .delete("/:id", async ({ params: { id }, set }) => {
        try {
            await deleteTag(id);
            return { success: true, message: "Đã xóa tag" };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: "Không tìm thấy tag để xóa" };
            }

            console.error("Lỗi khi xóa tag:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
    });