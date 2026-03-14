import { Elysia, t } from "elysia";
import {
    createRecipeTag,
    deleteRecipeTag,
    getAllRecipeTags,
    getRecipeTagById,
    updateRecipeTag,
} from "../services/recipe-tag.services";

export const recipeTagRoutes = new Elysia({ prefix: "v1/recipe-tags" })

    // 1. Lấy tất cả recipe tags (GET)
    .get("/", async ({ query, set }) => {
        try {
            const recipeTags = await getAllRecipeTags({
                recipeId: query.recipeId,
                tagId: query.tagId,
            });
            return { success: true, data: recipeTags };
        } catch (error) {
            console.error("Lỗi khi lấy danh sách recipe tags:", error);
            set.status = 500;
            return { success: false, message: "Lỗi khi lấy danh sách recipe tag" };
        }
    }, {
        query: t.Object({
            recipeId: t.Optional(t.Numeric()),
            tagId: t.Optional(t.Numeric()),
        }),
    })

    // 2. Lấy chi tiết recipe tag (GET)
    .get("/:recipeId/:tagId", async ({ params: { recipeId, tagId }, set }) => {
        try {
            const recipeTag = await getRecipeTagById(recipeId, tagId);
            if (!recipeTag) {
                set.status = 404;
                return { success: false, message: "Không tìm thấy recipe tag" };
            }

            return { success: true, data: recipeTag };
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết recipe tag:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({
            recipeId: t.Numeric(),
            tagId: t.Numeric(),
        }),
    })

    // 3. Tạo mới recipe tag (POST)
    .post("/", async ({ body, set }) => {
        try {
            const data = body as { recipeId: number; tagId: number };
            const newRecipeTag = await createRecipeTag(data);
            set.status = 201;
            return { success: true, message: "Tạo thành công", data: newRecipeTag };
        } catch (error) {
            console.error("Lỗi khi tạo recipe tag:", error);
            set.status = 500;
            return { success: false, message: "Lỗi khi tạo recipe tag" };
        }
    }, {
        body: t.Object({
            recipeId: t.Number(),
            tagId: t.Number(),
        }),
    })

    // 4. Cập nhật recipe tag (PUT)
    .put("/:recipeId/:tagId", async ({ params: { recipeId, tagId }, body, set }) => {
        try {
            const data = body as { recipeId?: number; tagId?: number };
            const hasDataToUpdate = Object.values(data).some((value) => value !== undefined);

            if (!hasDataToUpdate) {
                set.status = 400;
                return { success: false, message: "No fields to update" };
            }

            const updatedRecipeTag = await updateRecipeTag(recipeId, tagId, data);
            return { success: true, message: "Cập nhật thành công", data: updatedRecipeTag };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: "Không tìm thấy recipe tag để cập nhật" };
            }

            console.error("Lỗi khi cập nhật recipe tag:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({
            recipeId: t.Numeric(),
            tagId: t.Numeric(),
        }),
        body: t.Object({
            recipeId: t.Optional(t.Number()),
            tagId: t.Optional(t.Number()),
        }),
    })

    // 5. Xóa recipe tag (DELETE)
    .delete("/:recipeId/:tagId", async ({ params: { recipeId, tagId }, set }) => {
        try {
            await deleteRecipeTag(recipeId, tagId);
            return { success: true, message: "Đã xóa recipe tag" };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: "Không tìm thấy recipe tag để xóa" };
            }

            console.error("Lỗi khi xóa recipe tag:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({
            recipeId: t.Numeric(),
            tagId: t.Numeric(),
        }),
    });