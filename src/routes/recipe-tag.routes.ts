import { Elysia, t } from "elysia";
import { t as translate } from "../plugins/i18n";
import {
    createRecipeTag,
    deleteRecipeTag,
    getAllRecipeTags,
    getRecipeTagById,
    updateRecipeTag,
} from "../services/recipe-tag.services";

const locale = (req: Request) =>
    req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ?? "vi";

export const recipeTagRoutes = new Elysia({ prefix: "v1/recipe-tags" })

    // 1. Lấy tất cả recipe tags (GET)
    .get("/", async ({ query, set, request }) => {
        try {
            const recipeTags = await getAllRecipeTags({
                recipeId: query.recipeId,
                tagId: query.tagId,
            });
            return { success: true, data: recipeTags };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.recipe_tag.fetch", locale(request)) };
        }
    }, {
        query: t.Object({
            recipeId: t.Optional(t.Numeric()),
            tagId: t.Optional(t.Numeric()),
        }),
    })

    // 2. Lấy chi tiết recipe tag (GET)
    .get("/:recipeId/:tagId", async ({ params: { recipeId, tagId }, set, request }) => {
        try {
            const recipeTag = await getRecipeTagById(recipeId, tagId);
            if (!recipeTag) {
                set.status = 404;
                return { success: false, message: translate("errors.recipe_tag.not_found", locale(request)) };
            }
            return { success: true, data: recipeTag };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({
            recipeId: t.Numeric(),
            tagId: t.Numeric(),
        }),
    })

    // 3. Tạo mới recipe tag (POST)
    .post("/", async ({ body, set, request }) => {
        try {
            const data = body as { recipeId: number; tagId: number };
            const newRecipeTag = await createRecipeTag(data);
            set.status = 201;
            return { success: true, message: translate("success.created", locale(request)), data: newRecipeTag };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.recipe_tag.create_failed", locale(request)) };
        }
    }, {
        body: t.Object({
            recipeId: t.Number(),
            tagId: t.Number(),
        }),
    })

    // 4. Cập nhật recipe tag (PUT)
    .put("/:recipeId/:tagId", async ({ params: { recipeId, tagId }, body, set, request }) => {
        try {
            const data = body as { recipeId?: number; tagId?: number };
            const hasDataToUpdate = Object.values(data).some((value) => value !== undefined);

            if (!hasDataToUpdate) {
                set.status = 400;
                return { success: false, message: translate("errors.no_fields_to_update", locale(request)) };
            }

            const updatedRecipeTag = await updateRecipeTag(recipeId, tagId, data);
            return { success: true, message: translate("success.updated", locale(request)), data: updatedRecipeTag };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.recipe_tag.not_found_update", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
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
    .delete("/:recipeId/:tagId", async ({ params: { recipeId, tagId }, set, request }) => {
        try {
            await deleteRecipeTag(recipeId, tagId);
            return { success: true, message: translate("success.deleted", locale(request)) };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.recipe_tag.not_found_delete", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({
            recipeId: t.Numeric(),
            tagId: t.Numeric(),
        }),
    });
