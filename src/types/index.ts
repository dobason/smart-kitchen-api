import { t } from "elysia";

// ============================================
// USER SCHEMAS
// ============================================
export const userSchema = {
  update: t.Object({
    username: t.Optional(t.String({ minLength: 2, maxLength: 255 })),
    avatarUrl: t.Optional(t.String()),
  }),
};

// ============================================
// RECIPE SCHEMAS
// ============================================
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

// ============================================
// STEP SCHEMAS
// ============================================
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

// ============================================
// INGREDIENT SCHEMAS
// ============================================
export const ingredientSchema = {
  create: t.Object({
    name: t.String({ minLength: 1, maxLength: 255 }),
    icon: t.Optional(t.String()),
  }),
  update: t.Object({
    name: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    icon: t.Optional(t.String()),
  }),
};

// ============================================
// RECIPE INGREDIENT SCHEMAS
// ============================================
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

// ============================================
// TAG SCHEMAS
// ============================================
export const tagSchema = {
  create: t.Object({
    name: t.String({ minLength: 1, maxLength: 255 }),
    category: t.Optional(t.String()),
  }),
  update: t.Object({
    name: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    category: t.Optional(t.String()),
  }),
};

// ============================================
// COOKBOOK SCHEMAS
// ============================================
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

// ============================================
// COMMON SCHEMAS
// ============================================
export const paginationSchema = t.Object({
  page: t.Optional(t.Numeric({ minimum: 1, default: 1 })),
  limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100, default: 10 })),
});

export const idParamSchema = t.Object({
  id: t.Numeric(),
});

export const searchSchema = t.Object({
  q: t.Optional(t.String()),
  page: t.Optional(t.Numeric({ minimum: 1, default: 1 })),
  limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100, default: 10 })),
});

// ============================================
// RESPONSE TYPES
// ============================================
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

