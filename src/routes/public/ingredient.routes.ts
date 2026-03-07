import { Elysia } from "elysia";
import { ingredientService } from "../../services/ingredient.service";
import { searchSchema, idParamSchema, paginationSchema } from "../../types";

export const ingredientPublicRoutes = new Elysia({ prefix: "/ingredients" })
  .get("/", async ({ query }) => {
    const { page = 1, limit = 50, q } = query;
    const result = await ingredientService.findAll(Number(page), Number(limit), q);
    return { success: true, ...result };
  }, {
    query: searchSchema,
    detail: { tags: ["Public"], summary: "Get all ingredients" },
  })
  .get("/:id", async ({ params, set }) => {
    const ingredient = await ingredientService.findById(params.id);
    if (!ingredient) {
      set.status = 404;
      return { success: false, error: "Ingredient not found" };
    }
    return { success: true, data: ingredient };
  }, {
    params: idParamSchema,
    detail: { tags: ["Public"], summary: "Get ingredient by ID" },
  })
  .get("/:id/recipes", async ({ params, query, set }) => {
    const ingredient = await ingredientService.findById(params.id);
    if (!ingredient) {
      set.status = 404;
      return { success: false, error: "Ingredient not found" };
    }
    const { page = 1, limit = 10 } = query;
    const result = await ingredientService.getRecipesWithIngredient(params.id, Number(page), Number(limit));
    return { success: true, ...result };
  }, {
    params: idParamSchema,
    query: paginationSchema,
    detail: { tags: ["Public"], summary: "Get recipes using this ingredient" },
  });
