import { Elysia } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { tagService } from "../../services/tag.service";
import { tagSchema, idParamSchema, HttpStatus } from "../../types";

export const tagPrivateRoutes = new Elysia({ prefix: "/tags" })
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
  .post("/", async ({ body, set }) => {
    const tag = await tagService.create(body);
    set.status = HttpStatus.CREATED;
    return { success: true, data: tag };
  }, {
    body: tagSchema.create,
    detail: { tags: ["Private"], summary: "Create tag", security: [{ bearerAuth: [] }] },
  })
  .put("/:id", async ({ params, body, set }) => {
    const tag = await tagService.findById(params.id);
    if (!tag) {
      set.status = HttpStatus.NOT_FOUND;
      return { success: false, error: "Tag not found" };
    }
    const updated = await tagService.update(params.id, body);
    return { success: true, data: updated };
  }, {
    params: idParamSchema,
    body: tagSchema.update,
    detail: { tags: ["Private"], summary: "Update tag", security: [{ bearerAuth: [] }] },
  })
  .delete("/:id", async ({ params, set }) => {
    const tag = await tagService.findById(params.id);
    if (!tag) {
      set.status = HttpStatus.NOT_FOUND;
      return { success: false, error: "Tag not found" };
    }
    await tagService.delete(params.id);
    return { success: true, message: "Tag deleted successfully" };
  }, {
    params: idParamSchema,
    detail: { tags: ["Private"], summary: "Delete tag", security: [{ bearerAuth: [] }] },
  });
