import { Elysia, t } from "elysia";
import { ingredientService } from "../services/ingredient.service";
import { authMiddleware } from "../middleware/auth.middleware";
import { ingredientSchema, searchSchema, idParamSchema, paginationSchema } from "../types";

export const ingredientRoutes = new Elysia({ prefix: "/ingredients" })
  .use(authMiddleware)
  // Get all ingredients
  .get(
    "/",
    async ({ query }) => {
      const { page = 1, limit = 50, q } = query;
      const result = await ingredientService.findAll(Number(page), Number(limit), q);
      return { success: true, ...result };
    },
    {
      query: searchSchema,
      detail: {
        tags: ["Ingredients"],
        summary: "Get all ingredients",
      },
    }
  )
  // Get ingredient by ID
  .get(
    "/:id",
    async ({ params, set }) => {
      const ingredient = await ingredientService.findById(params.id);

      if (!ingredient) {
        set.status = 404;
        return { success: false, error: "Ingredient not found" };
      }

      return { success: true, data: ingredient };
    },
    {
      params: idParamSchema,
      detail: {
        tags: ["Ingredients"],
        summary: "Get ingredient by ID",
      },
    }
  )
  // Get recipes with ingredient
  .get(
    "/:id/recipes",
    async ({ params, query, set }) => {
      const ingredient = await ingredientService.findById(params.id);

      if (!ingredient) {
        set.status = 404;
        return { success: false, error: "Ingredient not found" };
      }

      const { page = 1, limit = 10 } = query;
      const result = await ingredientService.getRecipesWithIngredient(
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
        tags: ["Ingredients"],
        summary: "Get recipes using this ingredient",
      },
    }
  )
  // Create ingredient
  .post(
    "/",
    async ({ body, set }) => {
      const ingredient = await ingredientService.create(body);
      set.status = 201;
      return { success: true, data: ingredient };
    },
    {
      isAuth: true,
      body: ingredientSchema.create,
      detail: {
        tags: ["Ingredients"],
        summary: "Create ingredient",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  // Update ingredient
  .put(
    "/:id",
    async ({ params, body, set }) => {
      const ingredient = await ingredientService.findById(params.id);

      if (!ingredient) {
        set.status = 404;
        return { success: false, error: "Ingredient not found" };
      }

      const updated = await ingredientService.update(params.id, body);
      return { success: true, data: updated };
    },
    {
      isAuth: true,
      params: idParamSchema,
      body: ingredientSchema.update,
      detail: {
        tags: ["Ingredients"],
        summary: "Update ingredient",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  // Delete ingredient
  .delete(
    "/:id",
    async ({ params, set }) => {
      const ingredient = await ingredientService.findById(params.id);

      if (!ingredient) {
        set.status = 404;
        return { success: false, error: "Ingredient not found" };
      }

      await ingredientService.delete(params.id);
      return { success: true, message: "Ingredient deleted successfully" };
    },
    {
      isAuth: true,
      params: idParamSchema,
      detail: {
        tags: ["Ingredients"],
        summary: "Delete ingredient",
        security: [{ bearerAuth: [] }],
      },
    }
  );
