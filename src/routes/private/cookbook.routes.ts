import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { cookbookService } from "../../services/cookbook.service";
import { cookbookSchema, idParamSchema } from "../../types";

export const cookbookRoutes = new Elysia({ prefix: "/cookbooks" })
  .use(clerkPlugin())
  .onBeforeHandle(({ auth, set }) => {
    const { userId } = auth();
    if (!userId) {
      set.status = 401;
      return { success: false, error: "Unauthenticated" };
    }
  })
  .resolve(({ auth }) => {
    const { userId } = auth();
    return { userId: userId as string };
  })
  .get("/", async ({ userId }) => {
    const cookbooks = await cookbookService.findByUser(userId);
    return { success: true, data: cookbooks };
  }, {
    detail: { tags: ["Private"], summary: "Get my cookbooks", security: [{ bearerAuth: [] }] },
  })
  .get("/:id", async ({ params, userId, set }) => {
    const cookbook = await cookbookService.findById(params.id);
    if (!cookbook) {
      set.status = 404;
      return { success: false, error: "Cookbook not found" };
    }
    if (cookbook.userId !== userId) {
      set.status = 403;
      return { success: false, error: "Forbidden" };
    }
    return { success: true, data: cookbook };
  }, {
    params: idParamSchema,
    detail: { tags: ["Private"], summary: "Get cookbook by ID", security: [{ bearerAuth: [] }] },
  })
  .post("/", async ({ body, userId, set }) => {
    const cookbook = await cookbookService.create(userId, body.name);
    set.status = 201;
    return { success: true, data: cookbook };
  }, {
    body: cookbookSchema.create,
    detail: { tags: ["Private"], summary: "Create cookbook", security: [{ bearerAuth: [] }] },
  })
  .put("/:id", async ({ params, body, userId, set }) => {
    const cookbook = await cookbookService.findById(params.id);
    if (!cookbook) {
      set.status = 404;
      return { success: false, error: "Cookbook not found" };
    }
    if (cookbook.userId !== userId) {
      set.status = 403;
      return { success: false, error: "Forbidden" };
    }
    const updated = await cookbookService.update(params.id, body.name!);
    return { success: true, data: updated };
  }, {
    params: idParamSchema,
    body: cookbookSchema.update,
    detail: { tags: ["Private"], summary: "Update cookbook", security: [{ bearerAuth: [] }] },
  })
  .delete("/:id", async ({ params, userId, set }) => {
    const cookbook = await cookbookService.findById(params.id);
    if (!cookbook) {
      set.status = 404;
      return { success: false, error: "Cookbook not found" };
    }
    if (cookbook.userId !== userId) {
      set.status = 403;
      return { success: false, error: "Forbidden" };
    }
    await cookbookService.delete(params.id);
    return { success: true, message: "Cookbook deleted successfully" };
  }, {
    params: idParamSchema,
    detail: { tags: ["Private"], summary: "Delete cookbook", security: [{ bearerAuth: [] }] },
  })
  .post("/:id/recipes", async ({ params, body, userId, set }) => {
    const cookbook = await cookbookService.findById(params.id);
    if (!cookbook) {
      set.status = 404;
      return { success: false, error: "Cookbook not found" };
    }
    if (cookbook.userId !== userId) {
      set.status = 403;
      return { success: false, error: "Forbidden" };
    }
    const exists = await cookbookService.hasRecipe(params.id, body.recipeId);
    if (exists) {
      set.status = 400;
      return { success: false, error: "Recipe already in cookbook" };
    }
    const result = await cookbookService.addRecipe(params.id, body.recipeId);
    set.status = 201;
    return { success: true, data: result };
  }, {
    params: idParamSchema,
    body: cookbookSchema.addRecipe,
    detail: { tags: ["Private"], summary: "Add recipe to cookbook", security: [{ bearerAuth: [] }] },
  })
  .delete("/:id/recipes/:recipeId", async ({ params, userId, set }) => {
    const cookbook = await cookbookService.findById(params.id);
    if (!cookbook) {
      set.status = 404;
      return { success: false, error: "Cookbook not found" };
    }
    if (cookbook.userId !== userId) {
      set.status = 403;
      return { success: false, error: "Forbidden" };
    }
    await cookbookService.removeRecipe(params.id, params.recipeId);
    return { success: true, message: "Recipe removed from cookbook" };
  }, {
    params: t.Object({ id: t.Numeric(), recipeId: t.Numeric() }),
    detail: { tags: ["Private"], summary: "Remove recipe from cookbook", security: [{ bearerAuth: [] }] },
  });
