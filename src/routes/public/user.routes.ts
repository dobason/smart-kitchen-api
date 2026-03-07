import { Elysia, t } from "elysia";
import { userService } from "../../services/user.service";
import { recipeService } from "../../services/recipe.service";
import { paginationSchema } from "../../types";

export const userPublicRoutes = new Elysia({ prefix: "/users" })
  .get("/", async () => {
    const users = await userService.findAll();
    return { success: true, data: users };
  }, {
    detail: { tags: ["Public"], summary: "Get all users" },
  })
  .get("/:id", async ({ params, set }) => {
    const user = await userService.getUserWithRecipes(params.id);
    if (!user) {
      set.status = 404;
      return { success: false, error: "User not found" };
    }
    return { success: true, data: user };
  }, {
    params: t.Object({ id: t.String() }),
    detail: { tags: ["Public"], summary: "Get user by ID with recipes" },
  })
  .get("/:id/recipes", async ({ params, query, set }) => {
    const user = await userService.findById(params.id);
    if (!user) {
      set.status = 404;
      return { success: false, error: "User not found" };
    }
    const { page = 1, limit = 10 } = query;
    const result = await recipeService.findByUser(params.id, Number(page), Number(limit));
    return { success: true, ...result };
  }, {
    params: t.Object({ id: t.String() }),
    query: paginationSchema,
    detail: { tags: ["Public"], summary: "Get user's recipes" },
  });
