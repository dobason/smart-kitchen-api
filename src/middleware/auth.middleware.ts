import { Elysia } from "elysia";
import { clerkPlugin } from "elysia-clerk";

export const authMiddleware = new Elysia({ name: "auth" })
  .use(clerkPlugin())
  .macro({
    isAuth(enabled: boolean) {
      if (!enabled) return;

      return {
        beforeHandle({ auth, set }) {
          const { userId } = auth?.() ?? {};
          if (!userId) {
            set.status = 401;
            return { success: false, error: "Unauthorized" };
          }
        },
      };
    },
  });
