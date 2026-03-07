import { t } from "elysia";

export const recipeSchema = {
  create: t.Object({
    recipesName: t.String({ minLength: 1, maxLength: 255 }),
    description: t.Optional(t.String()),
    imageRecipe: t.Optional(t.String()),
    totalTime: t.Optional(t.Number()),
    calories: t.Optional(t.Number()),
    protein: t.Optional(t.Number()),
    carbs: t.Optional(t.Number()),
    fats: t.Optional(t.Number()),
    sourceType: t.Optional(t.Union([
      t.Literal("image"),
      t.Literal("video"),
      t.Literal("text"),
    ])),
    numberOfServes: t.Optional(t.Number()),
    steps: t.Optional(t.Array(t.Object({
      stepNumber: t.Number(),
      instruction: t.String(),
      tip: t.Optional(t.String()),
      time: t.Optional(t.Number()),
    }))),
    ingredients: t.Optional(t.Array(t.Object({
      ingredientId: t.Number(),
      quantity: t.Optional(t.Number()),
      unit: t.Optional(t.String()),
      note: t.Optional(t.String()),
    }))),
    tagIds: t.Optional(t.Array(t.Number())),
  }),
  update: t.Object({
    recipesName: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    description: t.Optional(t.String()),
    imageRecipe: t.Optional(t.String()),
    totalTime: t.Optional(t.Number()),
    calories: t.Optional(t.Number()),
    protein: t.Optional(t.Number()),
    carbs: t.Optional(t.Number()),
    fats: t.Optional(t.Number()),
    sourceType: t.Optional(t.Union([
      t.Literal("image"),
      t.Literal("video"),
      t.Literal("text"),
    ])),
    numberOfServes: t.Optional(t.Number()),
  }),
};

export const stepSchema = {
  create: t.Object({
    stepNumber: t.Number(),
    instruction: t.String(),
    tip: t.Optional(t.String()),
    time: t.Optional(t.Number()),
  }),
  update: t.Object({
    stepNumber: t.Optional(t.Number()),
    instruction: t.Optional(t.String()),
    tip: t.Optional(t.String()),
    time: t.Optional(t.Number()),
  }),
};

export const recipeIngredientSchema = {
  add: t.Object({
    ingredientId: t.Number(),
    quantity: t.Optional(t.Number()),
    unit: t.Optional(t.String()),
    note: t.Optional(t.String()),
  }),
  update: t.Object({
    quantity: t.Optional(t.Number()),
    unit: t.Optional(t.String()),
    note: t.Optional(t.String()),
  }),
};
