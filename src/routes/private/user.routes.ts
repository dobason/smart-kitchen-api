import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { userService } from "../../services/user.service";
import { userSchema, HttpStatus } from "../../types";

export const userPrivateRoutes = new Elysia({ prefix: "/users" })
  .use(clerkPlugin())
  .onBeforeHandle(({ auth, set }) => {
    const { userId } = auth();
    if (!userId) {
      set.status = HttpStatus.UNAUTHORIZED;
      return { success: false, error: "Unauthenticated" };
    }
  })
  .resolve(({ auth }) => {
    const { userId } = auth();
    return { userId: userId as string };
  })
  .put("/:id", async ({ params, body, userId, set }) => {
    if (userId !== params.id) {
      set.status = HttpStatus.FORBIDDEN;
      return { success: false, error: "Forbidden" };
    }
    const updated = await userService.update(params.id, body);
    return { success: true, data: updated };
  }, {
    params: t.Object({ id: t.String() }),
    body: userSchema.update,
    detail: { tags: ["Private"], summary: "Update user", security: [{ bearerAuth: [] }] },
  })
  .delete("/:id", async ({ params, userId, set }) => {
    if (userId !== params.id) {
      set.status = HttpStatus.FORBIDDEN;
      return { success: false, error: "Forbidden" };
    }
    await userService.delete(params.id);
    return { success: true, message: "User deleted successfully" };
  }, {
    params: t.Object({ id: t.String() }),
    detail: { tags: ["Private"], summary: "Delete user", security: [{ bearerAuth: [] }] },
  });
