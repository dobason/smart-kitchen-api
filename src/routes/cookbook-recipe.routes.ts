import { Elysia, t } from "elysia";
import {
    createCookbookRecipe,
    deleteCookbookRecipe,
    getAllCookbookRecipes,
    getCookbookRecipeById,
    updateCookbookRecipe,
} from "../services/cookbook-recipe.services";

export const cookbookRecipeRoutes = new Elysia({ prefix: "v1/cookbook-recipes" })

    // 1. Lấy tất cả cookbook recipes (GET)
    .get("/", async ({ query, set }) => {
        try {
            const cookbookRecipes = await getAllCookbookRecipes({
                recipeId: query.recipeId,
                cookbookId: query.cookbookId,
            });
            return { success: true, data: cookbookRecipes };
        } catch (error) {
            console.error("Lỗi khi lấy danh sách cookbook recipes:", error);
            set.status = 500;
            return { success: false, message: "Lỗi khi lấy danh sách cookbook recipe" };
        }
    }, {
        query: t.Object({
            recipeId: t.Optional(t.Numeric()),
            cookbookId: t.Optional(t.Numeric()),
        }),
    })

    // 2. Lấy chi tiết cookbook recipe (GET)
    .get("/:recipeId/:cookbookId", async ({ params: { recipeId, cookbookId }, set }) => {
        try {
            const cookbookRecipe = await getCookbookRecipeById(recipeId, cookbookId);
            if (!cookbookRecipe) {
                set.status = 404;
                return { success: false, message: "Không tìm thấy cookbook recipe" };
            }

            return { success: true, data: cookbookRecipe };
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết cookbook recipe:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({
            recipeId: t.Numeric(),
            cookbookId: t.Numeric(),
        }),
    })

    // 3. Tạo mới cookbook recipe (POST)
    .post("/", async ({ body, set }) => {
        try {
            const data = body as { recipeId: number; cookbookId: number };
            const newCookbookRecipe = await createCookbookRecipe(data);
            set.status = 201;
            return { success: true, message: "Tạo thành công", data: newCookbookRecipe };
        } catch (error) {
            console.error("Lỗi khi tạo cookbook recipe:", error);
            set.status = 500;
            return { success: false, message: "Lỗi khi tạo cookbook recipe" };
        }
    }, {
        body: t.Object({
            recipeId: t.Number(),
            cookbookId: t.Number(),
        }),
    })

    // 4. Cập nhật cookbook recipe (PUT)
    .put("/:recipeId/:cookbookId", async ({ params: { recipeId, cookbookId }, body, set }) => {
        try {
            const data = body as { recipeId?: number; cookbookId?: number };
            const hasDataToUpdate = Object.values(data).some((value) => value !== undefined);

            if (!hasDataToUpdate) {
                set.status = 400;
                return { success: false, message: "No fields to update" };
            }

            const updatedCookbookRecipe = await updateCookbookRecipe(recipeId, cookbookId, data);
            return { success: true, message: "Cập nhật thành công", data: updatedCookbookRecipe };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: "Không tìm thấy cookbook recipe để cập nhật" };
            }

            console.error("Lỗi khi cập nhật cookbook recipe:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({
            recipeId: t.Numeric(),
            cookbookId: t.Numeric(),
        }),
        body: t.Object({
            recipeId: t.Optional(t.Number()),
            cookbookId: t.Optional(t.Number()),
        }),
    })

    // 5. Xóa cookbook recipe (DELETE)
    .delete("/:recipeId/:cookbookId", async ({ params: { recipeId, cookbookId }, set }) => {
        try {
            await deleteCookbookRecipe(recipeId, cookbookId);
            return { success: true, message: "Đã xóa cookbook recipe" };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: "Không tìm thấy cookbook recipe để xóa" };
            }

            console.error("Lỗi khi xóa cookbook recipe:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({
            recipeId: t.Numeric(),
            cookbookId: t.Numeric(),
        }),
    });