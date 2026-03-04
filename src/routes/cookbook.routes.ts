import { Elysia, t } from "elysia";
import { cookbookService } from "../services/cookbook.service";
import { authMiddleware } from "../middleware/auth.middleware";
import { cookbookSchema, idParamSchema } from "../types";

export const cookbookRoutes = new Elysia({ prefix: "/cookbooks" })
  .use(authMiddleware)
  // Get current user's cookbooks
  .get(
    "/",
    async ({ auth }) => {
      const cookbooks = await cookbookService.findByUser(auth().userId!);
      return { success: true, data: cookbooks };
    },
    {
      isAuth: true,
      detail: {
        tags: ["Cookbooks"],
        summary: "Get my cookbooks",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  // Get cookbook by ID
  .get(
    "/:id",
    async ({ params, auth, set }) => {
      const cookbook = await cookbookService.findById(params.id);

      if (!cookbook) {
        set.status = 404;
        return { success: false, error: "Cookbook not found" };
      }

      // Check if user owns this cookbook
      if (cookbook.userId !== auth().userId) {
        set.status = 403;
        return { success: false, error: "Forbidden" };
      }

      return { success: true, data: cookbook };
    },
    {
      isAuth: true,
      params: idParamSchema,
      detail: {
        tags: ["Cookbooks"],
        summary: "Get cookbook by ID",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  // Create cookbook
  .post(
    "/",
    async ({ body, auth, set }) => {
      const cookbook = await cookbookService.create(auth().userId!, body.name);
      set.status = 201;
      return { success: true, data: cookbook };
    },
    {
      isAuth: true,
      body: cookbookSchema.create,
      detail: {
        tags: ["Cookbooks"],
        summary: "Create cookbook",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  // Update cookbook
  .put(
    "/:id",
    async ({ params, body, auth, set }) => {
      const cookbook = await cookbookService.findById(params.id);

      if (!cookbook) {
        set.status = 404;
        return { success: false, error: "Cookbook not found" };
      }

      if (cookbook.userId !== auth().userId!) {
        set.status = 403;
        return { success: false, error: "Forbidden" };
      }

      const updated = await cookbookService.update(params.id, body.name!);
      return { success: true, data: updated };
    },
    {
      isAuth: true,
      params: idParamSchema,
      body: cookbookSchema.update,
      detail: {
        tags: ["Cookbooks"],
        summary: "Update cookbook",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  // Delete cookbook
  .delete(
    "/:id",
    async ({ params, auth, set }) => {
      const cookbook = await cookbookService.findById(params.id);

      if (!cookbook) {
        set.status = 404;
        return { success: false, error: "Cookbook not found" };
      }

      if (cookbook.userId !== auth().userId!) {
        set.status = 403;
        return { success: false, error: "Forbidden" };
      }

      await cookbookService.delete(params.id);
      return { success: true, message: "Cookbook deleted successfully" };
    },
    {
      isAuth: true,
      params: idParamSchema,
      detail: {
        tags: ["Cookbooks"],
        summary: "Delete cookbook",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  // Add recipe to cookbook
  .post(
    "/:id/recipes",
    async ({ params, body, auth, set }) => {
      const cookbook = await cookbookService.findById(params.id);

      if (!cookbook) {
        set.status = 404;
        return { success: false, error: "Cookbook not found" };
      }

      if (cookbook.userId !== auth().userId!) {
        set.status = 403;
        return { success: false, error: "Forbidden" };
      }

      // Check if recipe already in cookbook
      const exists = await cookbookService.hasRecipe(params.id, body.recipeId);
      if (exists) {
        set.status = 400;
        return { success: false, error: "Recipe already in cookbook" };
      }

      const result = await cookbookService.addRecipe(params.id, body.recipeId);
      set.status = 201;
      return { success: true, data: result };
    },
    {
      isAuth: true,
      params: idParamSchema,
      body: cookbookSchema.addRecipe,
      detail: {
        tags: ["Cookbooks"],
        summary: "Add recipe to cookbook",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  // Remove recipe from cookbook
  .delete(
    "/:id/recipes/:recipeId",
    async ({ params, auth, set }) => {
      const cookbook = await cookbookService.findById(params.id);

      if (!cookbook) {
        set.status = 404;
        return { success: false, error: "Cookbook not found" };
      }

      if (cookbook.userId !== auth().userId!) {
        set.status = 403;
        return { success: false, error: "Forbidden" };
      }

      await cookbookService.removeRecipe(params.id, params.recipeId);
      return { success: true, message: "Recipe removed from cookbook" };
    },
    {
      isAuth: true,
      params: t.Object({ id: t.Numeric(), recipeId: t.Numeric() }),
      detail: {
        tags: ["Cookbooks"],
        summary: "Remove recipe from cookbook",
        security: [{ bearerAuth: [] }],
      },
    }
  );
