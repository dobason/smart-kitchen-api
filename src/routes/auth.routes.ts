import { Elysia } from "elysia";
import { userService } from "../services/user.service";
import { authMiddleware } from "../middleware/auth.middleware";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .use(authMiddleware)
  // Sync Clerk user into local DB on first sign-in
  .post(
    "/sync",
    async ({ auth, set }) => {
      const { userId } = auth();

      if (!userId) {
        set.status = 401;
        return { success: false, error: "Unauthorized" };
      }

      const user = await userService.upsert(userId);
      set.status = 201;
      return { success: true, data: user };
    },
    {
      isAuth: true,
      detail: {
        tags: ["Auth"],
        summary: "Sync Clerk user into local profile (call after first sign-in)",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  // Get current user profile with recipes
  .get(
    "/me",
    async ({ auth, set }) => {
      const { userId } = auth();
      const userData = await userService.getUserWithRecipes(userId!);

      if (!userData) {
        set.status = 404;
        return { success: false, error: "User profile not found. Call POST /auth/sync first." };
      }

      return { success: true, data: userData };
    },
    {
      isAuth: true,
      detail: {
        tags: ["Auth"],
        summary: "Get current user profile",
        security: [{ bearerAuth: [] }],
      },
    }
  );
