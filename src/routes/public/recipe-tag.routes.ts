import { Elysia, t } from "elysia";
import { t as translate } from "../../plugins/i18n";
import {
    getAllRecipeTags,
    getRecipeTagById,
} from "../../services/recipe-tag.services";

const locale = (req: Request) =>
    req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ?? "vi";

export const publicRecipeTagRoutes = new Elysia({ prefix: "v1/recipe-tags" })
    // Lấy tất cả recipe tags (GET)
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

    // Lấy chi tiết recipe tag (GET)
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
    });