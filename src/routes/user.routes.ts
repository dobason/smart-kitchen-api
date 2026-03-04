import { Elysia, t } from "elysia";
import { userService } from "../services/user.service";
import { recipeService } from "../services/recipe.service";
import { authMiddleware } from "../middleware/auth.middleware";
import { userSchema, paginationSchema } from "../types";

export const userRoutes = new Elysia({ prefix: "/users" })
  .use(authMiddleware)
  // Get all users
  .get(
    "/",
    async () => {
      const users = await userService.findAll();
      return { success: true, data: users };
    },
    {
      detail: {
        tags: ["Users"],
        summary: "Get all users",
      },
    }
  )
  // Get user by ID
  .get(
    "/:id",
    async ({ params, set }) => {
      const user = await userService.getUserWithRecipes(params.id);

      if (!user) {
        set.status = 404;
        return { success: false, error: "User not found" };
      }

      return { success: true, data: user };
    },
    {
      params: t.Object({ id: t.String() }),
      detail: {
        tags: ["Users"],
        summary: "Get user by ID with recipes",
      },
    }
  )
  // Get user's recipes
  .get(
    "/:id/recipes",
    async ({ params, query, set }) => {
      const user = await userService.findById(params.id);

      if (!user) {
        set.status = 404;
        return { success: false, error: "User not found" };
      }

      const { page = 1, limit = 10 } = query;
      const result = await recipeService.findByUser(params.id, Number(page), Number(limit));
      return { success: true, ...result };
    },
    {
      params: t.Object({ id: t.String() }),
      query: paginationSchema,
      detail: {
        tags: ["Users"],
        summary: "Get user's recipes",
      },
    }
  )
  // Update user
  .put(
    "/:id",
    async ({ params, body, auth, set }) => {
      const { userId } = auth();
      if (userId !== params.id) {
        set.status = 403;
        return { success: false, error: "Forbidden" };
      }

      const updated = await userService.update(params.id, body);
      return { success: true, data: updated };
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      body: userSchema.update,
      detail: {
        tags: ["Users"],
        summary: "Update user",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  // Delete user
  .delete(
    "/:id",
    async ({ params, auth, set }) => {
      const { userId } = auth();
      if (userId !== params.id) {
        set.status = 403;
        return { success: false, error: "Forbidden" };
      }

      await userService.delete(params.id);
      return { success: true, message: "User deleted successfully" };
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      detail: {
        tags: ["Users"],
        summary: "Delete user",
        security: [{ bearerAuth: [] }],
      },
    }
  );
