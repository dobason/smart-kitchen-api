import { Elysia } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { ingredientService } from "../../services/ingredient.service";
import { ingredientSchema, idParamSchema, HttpStatus } from "../../types";

export const ingredientPrivateRoutes = new Elysia({ prefix: "/ingredients" })
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
    const ingredient = await ingredientService.create(body);
    set.status = HttpStatus.CREATED;
    return { success: true, data: ingredient };
  }, {
    body: ingredientSchema.create,
    detail: { tags: ["Private"], summary: "Create ingredient", security: [{ bearerAuth: [] }] },
  })
  .put("/:id", async ({ params, body, set }) => {
    const ingredient = await ingredientService.findById(params.id);
    if (!ingredient) {
      set.status = HttpStatus.NOT_FOUND;
      return { success: false, error: "Ingredient not found" };
    }
    const updated = await ingredientService.update(params.id, body);
    return { success: true, data: updated };
  }, {
    params: idParamSchema,
    body: ingredientSchema.update,
    detail: { tags: ["Private"], summary: "Update ingredient", security: [{ bearerAuth: [] }] },
  })
  .delete("/:id", async ({ params, set }) => {
    const ingredient = await ingredientService.findById(params.id);
    if (!ingredient) {
      set.status = HttpStatus.NOT_FOUND;
      return { success: false, error: "Ingredient not found" };
    }
    await ingredientService.delete(params.id);
    return { success: true, message: "Ingredient deleted successfully" };
  }, {
    params: idParamSchema,
    detail: { tags: ["Private"], summary: "Delete ingredient", security: [{ bearerAuth: [] }] },
  });
