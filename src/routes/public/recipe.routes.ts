import { Elysia } from "elysia";
import { recipeService } from "../../services/recipe.service";
import { searchSchema, idParamSchema, HttpStatus } from "../../types";

export const recipePublicRoutes = new Elysia({ prefix: "/recipes" })
  .get("/", async ({ query }) => {
    const { page = 1, limit = 10, q } = query;
    const result = await recipeService.findAll(Number(page), Number(limit), q);
    return { success: true, ...result };
  }, {
    query: searchSchema,
    detail: { tags: ["Public"], summary: "Get all recipes with optional search" },
  })
  .get("/:id", async ({ params, set }) => {
    const recipe = await recipeService.findById(params.id);
    if (!recipe) {
      set.status = HttpStatus.NOT_FOUND;
      return { success: false, error: "Recipe not found" };
    }
    return { success: true, data: recipe };
  }, {
    params: idParamSchema,
    detail: { tags: ["Public"], summary: "Get recipe by ID" },
  });
