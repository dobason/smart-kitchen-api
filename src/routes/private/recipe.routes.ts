import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { recipeService } from "../../services/recipe.service";
import { recipeSchema, stepSchema, recipeIngredientSchema, idParamSchema, HttpStatus } from "../../types";

export const recipePrivateRoutes = new Elysia({ prefix: "/recipes" })
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
  .post("/", async ({ body, userId, set }) => {
    const recipe = await recipeService.create({ userId, ...body });
    set.status = HttpStatus.CREATED;
    return { success: true, data: recipe };
  }, {
    body: recipeSchema.create,
    detail: { tags: ["Private"], summary: "Create a new recipe", security: [{ bearerAuth: [] }] },
  })
  .put("/:id", async ({ params, body, userId, set }) => {
    const recipe = await recipeService.findById(params.id);
    if (!recipe) {
      set.status = HttpStatus.NOT_FOUND;
      return { success: false, error: "Recipe not found" };
    }
    if (recipe.userId !== userId) {
      set.status = HttpStatus.FORBIDDEN;
      return { success: false, error: "Forbidden" };
    }
    const updated = await recipeService.update(params.id, body);
    return { success: true, data: updated };
  }, {
    params: idParamSchema,
    body: recipeSchema.update,
    detail: { tags: ["Private"], summary: "Update recipe", security: [{ bearerAuth: [] }] },
  })
  .delete("/:id", async ({ params, userId, set }) => {
    const recipe = await recipeService.findById(params.id);
    if (!recipe) {
      set.status = HttpStatus.NOT_FOUND;
      return { success: false, error: "Recipe not found" };
    }
    if (recipe.userId !== userId) {
      set.status = HttpStatus.FORBIDDEN;
      return { success: false, error: "Forbidden" };
    }
    await recipeService.delete(params.id);
    return { success: true, message: "Recipe deleted successfully" };
  }, {
    params: idParamSchema,
    detail: { tags: ["Private"], summary: "Delete recipe", security: [{ bearerAuth: [] }] },
  })
  // Steps
  .post("/:id/steps", async ({ params, body, userId, set }) => {
    const recipe = await recipeService.findById(params.id);
    if (!recipe) {
      set.status = HttpStatus.NOT_FOUND;
      return { success: false, error: "Recipe not found" };
    }
    if (recipe.userId !== userId) {
      set.status = HttpStatus.FORBIDDEN;
      return { success: false, error: "Forbidden" };
    }
    const step = await recipeService.addStep(params.id, body);
    set.status = HttpStatus.CREATED;
    return { success: true, data: step };
  }, {
    params: idParamSchema,
    body: stepSchema.create,
    detail: { tags: ["Private"], summary: "Add step to recipe", security: [{ bearerAuth: [] }] },
  })
  .put("/:id/steps/:stepId", async ({ params, body, userId, set }) => {
    const recipe = await recipeService.findById(params.id);
    if (!recipe) {
      set.status = HttpStatus.NOT_FOUND;
      return { success: false, error: "Recipe not found" };
    }
    if (recipe.userId !== userId) {
      set.status = HttpStatus.FORBIDDEN;
      return { success: false, error: "Forbidden" };
    }
    const step = await recipeService.updateStep(params.stepId, body);
    return { success: true, data: step };
  }, {
    params: t.Object({ id: t.Numeric(), stepId: t.Numeric() }),
    body: stepSchema.update,
    detail: { tags: ["Private"], summary: "Update step", security: [{ bearerAuth: [] }] },
  })
  .delete("/:id/steps/:stepId", async ({ params, userId, set }) => {
    const recipe = await recipeService.findById(params.id);
    if (!recipe) {
      set.status = HttpStatus.NOT_FOUND;
      return { success: false, error: "Recipe not found" };
    }
    if (recipe.userId !== userId) {
      set.status = HttpStatus.FORBIDDEN;
      return { success: false, error: "Forbidden" };
    }
    await recipeService.deleteStep(params.stepId);
    return { success: true, message: "Step deleted successfully" };
  }, {
    params: t.Object({ id: t.Numeric(), stepId: t.Numeric() }),
    detail: { tags: ["Private"], summary: "Delete step", security: [{ bearerAuth: [] }] },
  })
  // Ingredients
  .post("/:id/ingredients", async ({ params, body, userId, set }) => {
    const recipe = await recipeService.findById(params.id);
    if (!recipe) {
      set.status = HttpStatus.NOT_FOUND;
      return { success: false, error: "Recipe not found" };
    }
    if (recipe.userId !== userId) {
      set.status = HttpStatus.FORBIDDEN;
      return { success: false, error: "Forbidden" };
    }
    const ingredient = await recipeService.addIngredient(params.id, body);
    set.status = HttpStatus.CREATED;
    return { success: true, data: ingredient };
  }, {
    params: idParamSchema,
    body: recipeIngredientSchema.add,
    detail: { tags: ["Private"], summary: "Add ingredient to recipe", security: [{ bearerAuth: [] }] },
  })
  .put("/:id/ingredients/:ingredientId", async ({ params, body, userId, set }) => {
    const recipe = await recipeService.findById(params.id);
    if (!recipe) {
      set.status = HttpStatus.NOT_FOUND;
      return { success: false, error: "Recipe not found" };
    }
    if (recipe.userId !== userId) {
      set.status = HttpStatus.FORBIDDEN;
      return { success: false, error: "Forbidden" };
    }
    const ingredient = await recipeService.updateRecipeIngredient(params.id, params.ingredientId, body);
    return { success: true, data: ingredient };
  }, {
    params: t.Object({ id: t.Numeric(), ingredientId: t.Numeric() }),
    body: recipeIngredientSchema.update,
    detail: { tags: ["Private"], summary: "Update recipe ingredient", security: [{ bearerAuth: [] }] },
  })
  .delete("/:id/ingredients/:ingredientId", async ({ params, userId, set }) => {
    const recipe = await recipeService.findById(params.id);
    if (!recipe) {
      set.status = HttpStatus.NOT_FOUND;
      return { success: false, error: "Recipe not found" };
    }
    if (recipe.userId !== userId) {
      set.status = HttpStatus.FORBIDDEN;
      return { success: false, error: "Forbidden" };
    }
    await recipeService.removeIngredient(params.id, params.ingredientId);
    return { success: true, message: "Ingredient removed successfully" };
  }, {
    params: t.Object({ id: t.Numeric(), ingredientId: t.Numeric() }),
    detail: { tags: ["Private"], summary: "Remove ingredient from recipe", security: [{ bearerAuth: [] }] },
  })
  // Tags
  .post("/:id/tags/:tagId", async ({ params, userId, set }) => {
    const recipe = await recipeService.findById(params.id);
    if (!recipe) {
      set.status = HttpStatus.NOT_FOUND;
      return { success: false, error: "Recipe not found" };
    }
    if (recipe.userId !== userId) {
      set.status = HttpStatus.FORBIDDEN;
      return { success: false, error: "Forbidden" };
    }
    const tag = await recipeService.addTag(params.id, params.tagId);
    set.status = HttpStatus.CREATED;
    return { success: true, data: tag };
  }, {
    params: t.Object({ id: t.Numeric(), tagId: t.Numeric() }),
    detail: { tags: ["Private"], summary: "Add tag to recipe", security: [{ bearerAuth: [] }] },
  })
  .delete("/:id/tags/:tagId", async ({ params, userId, set }) => {
    const recipe = await recipeService.findById(params.id);
    if (!recipe) {
      set.status = HttpStatus.NOT_FOUND;
      return { success: false, error: "Recipe not found" };
    }
    if (recipe.userId !== userId) {
      set.status = HttpStatus.FORBIDDEN;
      return { success: false, error: "Forbidden" };
    }
    await recipeService.removeTag(params.id, params.tagId);
    return { success: true, message: "Tag removed successfully" };
  }, {
    params: t.Object({ id: t.Numeric(), tagId: t.Numeric() }),
    detail: { tags: ["Private"], summary: "Remove tag from recipe", security: [{ bearerAuth: [] }] },
  });
