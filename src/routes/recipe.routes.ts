import { Elysia, t } from "elysia";
import { recipeService } from "../services/recipe.service";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  recipeSchema,
  stepSchema,
  recipeIngredientSchema,
  searchSchema,
  idParamSchema,
} from "../types";

export const recipeRoutes = new Elysia({ prefix: "/recipes" })
  .use(authMiddleware)
  // Get all recipes
  .get(
    "/",
    async ({ query }) => {
      const { page = 1, limit = 10, q } = query;
      const result = await recipeService.findAll(Number(page), Number(limit), q);
      return { success: true, ...result };
    },
    {
      query: searchSchema,
      detail: {
        tags: ["Recipes"],
        summary: "Get all recipes with optional search",
      },
    }
  )
  // Get recipe by ID
  .get(
    "/:id",
    async ({ params, set }) => {
      const recipe = await recipeService.findById(params.id);

      if (!recipe) {
        set.status = 404;
        return { success: false, error: "Recipe not found" };
      }

      return { success: true, data: recipe };
    },
    {
      params: idParamSchema,
      detail: {
        tags: ["Recipes"],
        summary: "Get recipe by ID",
      },
    }
  )
  // Create recipe
  .post(
    "/",
    async ({ body, auth, set }) => {
      const recipe = await recipeService.create({
        userId: auth().userId!,
        ...body,
      });

      set.status = 201;
      return { success: true, data: recipe };
    },
    {
      isAuth: true,
      body: recipeSchema.create,
      detail: {
        tags: ["Recipes"],
        summary: "Create a new recipe",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  // Update recipe
  .put(
    "/:id",
    async ({ params, body, auth, set }) => {
      const recipe = await recipeService.findById(params.id);

      if (!recipe) {
        set.status = 404;
        return { success: false, error: "Recipe not found" };
      }

      if (recipe.userId !== auth().userId!) {
        set.status = 403;
        return { success: false, error: "Forbidden" };
      }

      const updated = await recipeService.update(params.id, body);
      return { success: true, data: updated };
    },
    {
      isAuth: true,
      params: idParamSchema,
      body: recipeSchema.update,
      detail: {
        tags: ["Recipes"],
        summary: "Update recipe",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  // Delete recipe
  .delete(
    "/:id",
    async ({ params, auth, set }) => {
      const recipe = await recipeService.findById(params.id);

      if (!recipe) {
        set.status = 404;
        return { success: false, error: "Recipe not found" };
      }

      if (recipe.userId !== auth().userId!) {
        set.status = 403;
        return { success: false, error: "Forbidden" };
      }

      await recipeService.delete(params.id);
      return { success: true, message: "Recipe deleted successfully" };
    },
    {
      isAuth: true,
      params: idParamSchema,
      detail: {
        tags: ["Recipes"],
        summary: "Delete recipe",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  // ============================================
  // STEPS ENDPOINTS
  // ============================================
  .post(
    "/:id/steps",
    async ({ params, body, auth, set }) => {
      const recipe = await recipeService.findById(params.id);

      if (!recipe) {
        set.status = 404;
        return { success: false, error: "Recipe not found" };
      }

      if (recipe.userId !== auth().userId!) {
        set.status = 403;
        return { success: false, error: "Forbidden" };
      }

      const step = await recipeService.addStep(params.id, body);
      set.status = 201;
      return { success: true, data: step };
    },
    {
      isAuth: true,
      params: idParamSchema,
      body: stepSchema.create,
      detail: {
        tags: ["Recipe Steps"],
        summary: "Add step to recipe",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .put(
    "/:id/steps/:stepId",
    async ({ params, body, auth, set }) => {
      const recipe = await recipeService.findById(params.id);

      if (!recipe) {
        set.status = 404;
        return { success: false, error: "Recipe not found" };
      }

      if (recipe.userId !== auth().userId!) {
        set.status = 403;
        return { success: false, error: "Forbidden" };
      }

      const step = await recipeService.updateStep(params.stepId, body);
      return { success: true, data: step };
    },
    {
      isAuth: true,
      params: t.Object({ id: t.Numeric(), stepId: t.Numeric() }),
      body: stepSchema.update,
      detail: {
        tags: ["Recipe Steps"],
        summary: "Update step",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .delete(
    "/:id/steps/:stepId",
    async ({ params, auth, set }) => {
      const recipe = await recipeService.findById(params.id);

      if (!recipe) {
        set.status = 404;
        return { success: false, error: "Recipe not found" };
      }

      if (recipe.userId !== auth().userId!) {
        set.status = 403;
        return { success: false, error: "Forbidden" };
      }

      await recipeService.deleteStep(params.stepId);
      return { success: true, message: "Step deleted successfully" };
    },
    {
      isAuth: true,
      params: t.Object({ id: t.Numeric(), stepId: t.Numeric() }),
      detail: {
        tags: ["Recipe Steps"],
        summary: "Delete step",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  // ============================================
  // INGREDIENTS ENDPOINTS
  // ============================================
  .post(
    "/:id/ingredients",
    async ({ params, body, auth, set }) => {
      const recipe = await recipeService.findById(params.id);

      if (!recipe) {
        set.status = 404;
        return { success: false, error: "Recipe not found" };
      }

      if (recipe.userId !== auth().userId!) {
        set.status = 403;
        return { success: false, error: "Forbidden" };
      }

      const ingredient = await recipeService.addIngredient(params.id, body);
      set.status = 201;
      return { success: true, data: ingredient };
    },
    {
      isAuth: true,
      params: idParamSchema,
      body: recipeIngredientSchema.add,
      detail: {
        tags: ["Recipe Ingredients"],
        summary: "Add ingredient to recipe",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .put(
    "/:id/ingredients/:ingredientId",
    async ({ params, body, auth, set }) => {
      const recipe = await recipeService.findById(params.id);

      if (!recipe) {
        set.status = 404;
        return { success: false, error: "Recipe not found" };
      }

      if (recipe.userId !== auth().userId!) {
        set.status = 403;
        return { success: false, error: "Forbidden" };
      }

      const ingredient = await recipeService.updateRecipeIngredient(
        params.id,
        params.ingredientId,
        body
      );
      return { success: true, data: ingredient };
    },
    {
      isAuth: true,
      params: t.Object({ id: t.Numeric(), ingredientId: t.Numeric() }),
      body: recipeIngredientSchema.update,
      detail: {
        tags: ["Recipe Ingredients"],
        summary: "Update recipe ingredient",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .delete(
    "/:id/ingredients/:ingredientId",
    async ({ params, auth, set }) => {
      const recipe = await recipeService.findById(params.id);

      if (!recipe) {
        set.status = 404;
        return { success: false, error: "Recipe not found" };
      }

      if (recipe.userId !== auth().userId!) {
        set.status = 403;
        return { success: false, error: "Forbidden" };
      }

      await recipeService.removeIngredient(params.id, params.ingredientId);
      return { success: true, message: "Ingredient removed successfully" };
    },
    {
      isAuth: true,
      params: t.Object({ id: t.Numeric(), ingredientId: t.Numeric() }),
      detail: {
        tags: ["Recipe Ingredients"],
        summary: "Remove ingredient from recipe",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  // ============================================
  // TAGS ENDPOINTS
  // ============================================
  .post(
    "/:id/tags/:tagId",
    async ({ params, auth, set }) => {
      const recipe = await recipeService.findById(params.id);

      if (!recipe) {
        set.status = 404;
        return { success: false, error: "Recipe not found" };
      }

      if (recipe.userId !== auth().userId!) {
        set.status = 403;
        return { success: false, error: "Forbidden" };
      }

      const tag = await recipeService.addTag(params.id, params.tagId);
      set.status = 201;
      return { success: true, data: tag };
    },
    {
      isAuth: true,
      params: t.Object({ id: t.Numeric(), tagId: t.Numeric() }),
      detail: {
        tags: ["Recipe Tags"],
        summary: "Add tag to recipe",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .delete(
    "/:id/tags/:tagId",
    async ({ params, auth, set }) => {
      const recipe = await recipeService.findById(params.id);

      if (!recipe) {
        set.status = 404;
        return { success: false, error: "Recipe not found" };
      }

      if (recipe.userId !== auth().userId!) {
        set.status = 403;
        return { success: false, error: "Forbidden" };
      }

      await recipeService.removeTag(params.id, params.tagId);
      return { success: true, message: "Tag removed successfully" };
    },
    {
      isAuth: true,
      params: t.Object({ id: t.Numeric(), tagId: t.Numeric() }),
      detail: {
        tags: ["Recipe Tags"],
        summary: "Remove tag from recipe",
        security: [{ bearerAuth: [] }],
      },
    }
  );
