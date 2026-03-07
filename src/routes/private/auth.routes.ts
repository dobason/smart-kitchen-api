import { Elysia } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { userService } from "../../services/user.service";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .use(clerkPlugin())
  .onBeforeHandle(({ auth, clerk, set }) => {
    const { userId } = auth()
    if (!userId) {
      set.status = 401;
      return { success: false, error: "Unauthenticated" };
    }
  })
  .resolve(({ auth }) => {
    const { userId } = auth();
    return { userId }
  })
  // Sync Clerk user into local DB on first sign-in
  .post("/sync", async ({ userId, set }) => {
    const user = await userService.upsert(userId!);
    set.status = 201;
    return { success: true, data: user };
  }, {
    detail: { tags: ["Private"], summary: "Sync Clerk user into local DB", security: [{ bearerAuth: [] }] },
  })
  .get("/me", async ({ userId, set }) => {
    const userData = await userService.getUserWithRecipes(userId!);
    if (!userData) {
      set.status = 404;
      return { success: false, error: "User profile not found. Call POST /auth/sync first." };
    }
    return { success: true, data: userData };
  }, {
    detail: { tags: ["Private"], summary: "Get current user profile", security: [{ bearerAuth: [] }] },
  });
