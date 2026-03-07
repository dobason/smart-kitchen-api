import { Elysia, t } from "elysia";
import { tagService } from "../../services/tag.service";
import { recipeService } from "../../services/recipe.service";
import { idParamSchema, paginationSchema, HttpStatus } from "../../types";

export const tagPublicRoutes = new Elysia({ prefix: "/tags" })
  .get("/", async ({ query }) => {
    const tags = await tagService.findAll(query.category);
    return { success: true, data: tags };
  }, {
    query: t.Object({ category: t.Optional(t.String()) }),
    detail: { tags: ["Public"], summary: "Get all tags" },
  })
  .get("/grouped", async () => {
    const grouped = await tagService.getTagsGroupedByCategory();
    return { success: true, data: grouped };
  }, {
    detail: { tags: ["Public"], summary: "Get tags grouped by category" },
  })
  .get("/categories", async () => {
    const categories = await tagService.getCategories();
    return { success: true, data: categories };
  }, {
    detail: { tags: ["Public"], summary: "Get all tag categories" },
  })
  .get("/:id", async ({ params, set }) => {
    const tag = await tagService.findById(params.id);
    if (!tag) {
      set.status = HttpStatus.NOT_FOUND;
      return { success: false, error: "Tag not found" };
    }
    return { success: true, data: tag };
  }, {
    params: idParamSchema,
    detail: { tags: ["Public"], summary: "Get tag by ID" },
  })
  .get("/:id/recipes", async ({ params, query, set }) => {
    const tag = await tagService.findById(params.id);
    if (!tag) {
      set.status = HttpStatus.NOT_FOUND;
      return { success: false, error: "Tag not found" };
    }
    const { page = 1, limit = 10 } = query;
    const result = await recipeService.findByTag(params.id, Number(page), Number(limit));
    return { success: true, ...result };
  }, {
    params: idParamSchema,
    query: paginationSchema,
    detail: { tags: ["Public"], summary: "Get recipes by tag" },
  });
