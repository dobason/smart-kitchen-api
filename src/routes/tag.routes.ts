import { Elysia, t } from "elysia";
import { tagService } from "../services/tag.service";
import { recipeService } from "../services/recipe.service";
import { authMiddleware } from "../middleware/auth.middleware";
import { tagSchema, idParamSchema, paginationSchema } from "../types";

export const tagRoutes = new Elysia({ prefix: "/tags" })
  .use(authMiddleware)
  // Get all tags
  .get(
    "/",
    async ({ query }) => {
      const tags = await tagService.findAll(query.category);
      return { success: true, data: tags };
    },
    {
      query: t.Object({
        category: t.Optional(t.String()),
      }),
      detail: {
        tags: ["Tags"],
        summary: "Get all tags",
      },
    }
  )
  // Get tags grouped by category
  .get(
    "/grouped",
    async () => {
      const grouped = await tagService.getTagsGroupedByCategory();
      return { success: true, data: grouped };
    },
    {
      detail: {
        tags: ["Tags"],
        summary: "Get tags grouped by category",
      },
    }
  )
  // Get all categories
  .get(
    "/categories",
    async () => {
      const categories = await tagService.getCategories();
      return { success: true, data: categories };
    },
    {
      detail: {
        tags: ["Tags"],
        summary: "Get all tag categories",
      },
    }
  )
  // Get tag by ID
  .get(
    "/:id",
    async ({ params, set }) => {
      const tag = await tagService.findById(params.id);

      if (!tag) {
        set.status = 404;
        return { success: false, error: "Tag not found" };
      }

      return { success: true, data: tag };
    },
    {
      params: idParamSchema,
      detail: {
        tags: ["Tags"],
        summary: "Get tag by ID",
      },
    }
  )
  // Get recipes by tag
  .get(
    "/:id/recipes",
    async ({ params, query, set }) => {
      const tag = await tagService.findById(params.id);

      if (!tag) {
        set.status = 404;
        return { success: false, error: "Tag not found" };
      }

      const { page = 1, limit = 10 } = query;
      const result = await recipeService.findByTag(
        params.id,
        Number(page),
        Number(limit)
      );
      return { success: true, ...result };
    },
    {
      params: idParamSchema,
      query: paginationSchema,
      detail: {
        tags: ["Tags"],
        summary: "Get recipes by tag",
      },
    }
  )
  // Create tag
  .post(
    "/",
    async ({ body, set }) => {
      const tag = await tagService.create(body);
      set.status = 201;
      return { success: true, data: tag };
    },
    {
      isAuth: true,
      body: tagSchema.create,
      detail: {
        tags: ["Tags"],
        summary: "Create tag",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  // Update tag
  .put(
    "/:id",
    async ({ params, body, set }) => {
      const tag = await tagService.findById(params.id);

      if (!tag) {
        set.status = 404;
        return { success: false, error: "Tag not found" };
      }

      const updated = await tagService.update(params.id, body);
      return { success: true, data: updated };
    },
    {
      isAuth: true,
      params: idParamSchema,
      body: tagSchema.update,
      detail: {
        tags: ["Tags"],
        summary: "Update tag",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  // Delete tag
  .delete(
    "/:id",
    async ({ params, set }) => {
      const tag = await tagService.findById(params.id);

      if (!tag) {
        set.status = 404;
        return { success: false, error: "Tag not found" };
      }

      await tagService.delete(params.id);
      return { success: true, message: "Tag deleted successfully" };
    },
    {
      isAuth: true,
      params: idParamSchema,
      detail: {
        tags: ["Tags"],
        summary: "Delete tag",
        security: [{ bearerAuth: [] }],
      },
    }
  );
