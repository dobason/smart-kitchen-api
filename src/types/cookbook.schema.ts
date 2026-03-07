import { t } from "elysia";

export const cookbookSchema = {
  create: t.Object({
    name: t.String({ minLength: 1, maxLength: 255 }),
  }),
  update: t.Object({
    name: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
  }),
  addRecipe: t.Object({
    recipeId: t.Number(),
  }),
};
