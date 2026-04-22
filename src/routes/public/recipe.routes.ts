import { Elysia, t } from "elysia";
import { t as translate } from "../../plugins/i18n";
import {
    getAllRecipes,
    getRecipeById,
} from "../../services/recipe.services";

const sourceTypeSchema = t.Optional(
    t.Union([ t.Literal("MANUAL"), t.Literal("IMPORTED"), t.Literal("AI_GENERATED") ]),
);

const locale = (req: Request) =>
    req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ?? "vi";

export const publicRecipeRoutes = new Elysia({ prefix: "v1/recipes" })
    
    // Lấy tất cả recipes (GET)
    .get("/", async ({ query, set, request }) => {
        try {
            const recipes = await getAllRecipes({
                sourceType: query.sourceType,
                userId: query.userId,
                keyword: query.search,
            });
            return { success: true, data: recipes };
        } catch (error: any) {
            set.status = 500;
            return { success: false, message: error.message || translate("errors.recipe.fetch", locale(request)) };
        }
    }, {
        query: t.Object({
            sourceType: sourceTypeSchema,
            userId: t.Optional(t.String()),
            search: t.Optional(t.String()),
        }),
        detail: { tags: ["Public"], summary: "Get all recipes" }
    })

    // Lấy chi tiết recipe (GET)
    .get("/:id", async ({ params: { id }, set, request }) => {
        try {
            const recipe = await getRecipeById(id);
            if (!recipe) {
                set.status = 404;
                return { success: false, message: translate("errors.recipe.not_found", locale(request)) };
            }
            return { success: true, data: recipe };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
        detail: { tags: ["Public"], summary: "Get recipe by id" }
    });