import { Elysia, t } from "elysia";
import {
    createRecipe,
    deleteRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
} from "../services/recipe.services";

const sourceTypeSchema = t.Optional(
    t.Union([
        t.Literal("MANUAL"),
        t.Literal("IMPORTED"),
        t.Literal("AI_GENERATED"),
    ]),
);

export const recipeRoutes = new Elysia({ prefix: "v1/recipes" })

    // 1. Lấy tất cả recipes (GET)
    .get("/", async ({ query, set }) => {
        try {
            const recipes = await getAllRecipes({
                userId: query.userId,
                sourceType: query.sourceType,
            });
            return { success: true, data: recipes };
        } catch (error) {
            console.error("Lỗi khi lấy danh sách recipes:", error);
            set.status = 500;
            return { success: false, message: "Lỗi khi lấy danh sách công thức" };
        }
    }, {
        query: t.Object({
            userId: t.Optional(t.Numeric()),
            sourceType: sourceTypeSchema,
        }),
    })

    // 2. Lấy chi tiết recipe (GET)
    .get("/:id", async ({ params: { id }, set }) => {
        try {
            const recipe = await getRecipeById(id);
            if (!recipe) {
                set.status = 404;
                return { success: false, message: "Không tìm thấy recipe" };
            }

            return { success: true, data: recipe };
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết recipe:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
    })

    // 3. Tạo mới recipe (POST)
    .post("/", async ({ body, set }) => {
        try {
            const data = body as {
                userId: number;
                recipesName: string;
                description?: string;
                imageRecipe?: string;
                totalTime?: number;
                calories?: number;
                protein?: number;
                carbs?: number;
                fats?: number;
                sourceType?: "MANUAL" | "IMPORTED" | "AI_GENERATED";
                numberOfServes?: number;
            };

            if (!data.recipesName.trim()) {
                set.status = 400;
                return { success: false, message: "Tên recipe không được để trống" };
            }

            const newRecipe = await createRecipe(data);
            set.status = 201;
            return { success: true, message: "Tạo thành công", data: newRecipe };
        } catch (error) {
            console.error("Lỗi khi tạo recipe:", error);
            set.status = 500;
            return { success: false, message: "Lỗi khi tạo recipe" };
        }
    }, {
        body: t.Object({
            userId: t.Number(),
            recipesName: t.String(),
            description: t.Optional(t.String()),
            imageRecipe: t.Optional(t.String()),
            totalTime: t.Optional(t.Number()),
            calories: t.Optional(t.Number()),
            protein: t.Optional(t.Number()),
            carbs: t.Optional(t.Number()),
            fats: t.Optional(t.Number()),
            sourceType: sourceTypeSchema,
            numberOfServes: t.Optional(t.Number()),
        }),
    })

    // 4. Cập nhật recipe (PUT)
    .put("/:id", async ({ params: { id }, body, set }) => {
        try {
            const data = body as {
                userId?: number;
                recipesName?: string;
                description?: string;
                imageRecipe?: string;
                totalTime?: number;
                calories?: number;
                protein?: number;
                carbs?: number;
                fats?: number;
                sourceType?: "MANUAL" | "IMPORTED" | "AI_GENERATED";
                numberOfServes?: number;
            };

            if (data.recipesName !== undefined && !data.recipesName.trim()) {
                set.status = 400;
                return { success: false, message: "Tên recipe không được để trống" };
            }

            const hasDataToUpdate = Object.values(data).some((value) => value !== undefined);
            if (!hasDataToUpdate) {
                set.status = 400;
                return { success: false, message: "No fields to update" };
            }

            const updatedRecipe = await updateRecipe(id, data);
            return { success: true, message: "Cập nhật thành công", data: updatedRecipe };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: "Không tìm thấy recipe để cập nhật" };
            }

            console.error("Lỗi khi cập nhật recipe:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
        body: t.Object({
            userId: t.Optional(t.Number()),
            recipesName: t.Optional(t.String()),
            description: t.Optional(t.String()),
            imageRecipe: t.Optional(t.String()),
            totalTime: t.Optional(t.Number()),
            calories: t.Optional(t.Number()),
            protein: t.Optional(t.Number()),
            carbs: t.Optional(t.Number()),
            fats: t.Optional(t.Number()),
            sourceType: sourceTypeSchema,
            numberOfServes: t.Optional(t.Number()),
        }),
    })

    // 5. Xóa recipe (DELETE)
    .delete("/:id", async ({ params: { id }, set }) => {
        try {
            await deleteRecipe(id);
            return { success: true, message: "Đã xóa recipe" };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: "Không tìm thấy recipe để xóa" };
            }

            console.error("Lỗi khi xóa recipe:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
    });