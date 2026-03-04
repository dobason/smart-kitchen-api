import { prisma } from "../lib/prisma";
import type { SourceType } from "@prisma/client";

export class RecipeService {
  // Get all recipes with pagination
  async findAll(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;
    const where = search
      ? {
          OR: [
            { recipesName: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const [recipes, total] = await Promise.all([
      prisma.recipe.findMany({
        where,
        include: {
          user: {
            select: { userId: true, username: true, avatarUrl: true },
          },
          recipeTags: {
            include: { tag: true },
          },
          _count: {
            select: { steps: true, recipeIngredients: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.recipe.count({ where }),
    ]);

    return {
      data: recipes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get recipe by ID with all relations
  async findById(recipeId: number) {
    return prisma.recipe.findUnique({
      where: { recipeId },
      include: {
        user: {
          select: { userId: true, username: true, avatarUrl: true },
        },
        steps: {
          orderBy: { stepNumber: "asc" },
        },
        recipeIngredients: {
          include: {
            ingredient: true,
          },
        },
        recipeTags: {
          include: { tag: true },
        },
      },
    });
  }

  // Get recipes by user
  async findByUser(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [recipes, total] = await Promise.all([
      prisma.recipe.findMany({
        where: { userId },
        include: {
          recipeTags: { include: { tag: true } },
          _count: { select: { steps: true, recipeIngredients: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.recipe.count({ where: { userId } }),
    ]);

    return {
      data: recipes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get recipes by tag
  async findByTag(tagId: number, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [recipes, total] = await Promise.all([
      prisma.recipe.findMany({
        where: {
          recipeTags: { some: { tagId } },
        },
        include: {
          user: { select: { userId: true, username: true, avatarUrl: true } },
          recipeTags: { include: { tag: true } },
          _count: { select: { steps: true, recipeIngredients: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.recipe.count({
        where: { recipeTags: { some: { tagId } } },
      }),
    ]);

    return {
      data: recipes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Create recipe with steps, ingredients, and tags
  async create(data: {
    userId: string;
    recipesName: string;
    description?: string;
    imageRecipe?: string;
    totalTime?: number;
    calories?: number;
    protein?: number;
    carbs?: number;
    fats?: number;
    sourceType?: SourceType;
    numberOfServes?: number;
    steps?: {
      stepNumber: number;
      instruction: string;
      tip?: string;
      time?: number;
    }[];
    ingredients?: {
      ingredientId: number;
      quantity?: number;
      unit?: string;
      note?: string;
    }[];
    tagIds?: number[];
  }) {
    const { steps, ingredients, tagIds, ...recipeData } = data;

    return prisma.recipe.create({
      data: {
        ...recipeData,
        steps: steps
          ? {
              create: steps,
            }
          : undefined,
        recipeIngredients: ingredients
          ? {
              create: ingredients,
            }
          : undefined,
        recipeTags: tagIds
          ? {
              create: tagIds.map((tagId) => ({ tagId })),
            }
          : undefined,
      },
      include: {
        user: { select: { userId: true, username: true, avatarUrl: true } },
        steps: { orderBy: { stepNumber: "asc" } },
        recipeIngredients: { include: { ingredient: true } },
        recipeTags: { include: { tag: true } },
      },
    });
  }

  // Update recipe
  async update(
    recipeId: number,
    data: {
      recipesName?: string;
      description?: string;
      imageRecipe?: string;
      totalTime?: number;
      calories?: number;
      protein?: number;
      carbs?: number;
      fats?: number;
      sourceType?: SourceType;
      numberOfServes?: number;
    }
  ) {
    return prisma.recipe.update({
      where: { recipeId },
      data,
      include: {
        user: { select: { userId: true, username: true, avatarUrl: true } },
        steps: { orderBy: { stepNumber: "asc" } },
        recipeIngredients: { include: { ingredient: true } },
        recipeTags: { include: { tag: true } },
      },
    });
  }

  // Delete recipe
  async delete(recipeId: number): Promise<boolean> {
    await prisma.recipe.delete({
      where: { recipeId },
    });
    return true;
  }

  // ============================================
  // STEPS MANAGEMENT
  // ============================================
  async addStep(
    recipeId: number,
    data: {
      stepNumber: number;
      instruction: string;
      tip?: string;
      time?: number;
    }
  ) {
    return prisma.step.create({
      data: { recipeId, ...data },
    });
  }

  async updateStep(
    stepId: number,
    data: {
      stepNumber?: number;
      instruction?: string;
      tip?: string;
      time?: number;
    }
  ) {
    return prisma.step.update({
      where: { stepId },
      data,
    });
  }

  async deleteStep(stepId: number): Promise<boolean> {
    await prisma.step.delete({ where: { stepId } });
    return true;
  }

  // ============================================
  // RECIPE INGREDIENTS MANAGEMENT
  // ============================================
  async addIngredient(
    recipeId: number,
    data: {
      ingredientId: number;
      quantity?: number;
      unit?: string;
      note?: string;
    }
  ) {
    return prisma.recipeIngredient.create({
      data: { recipeId, ...data },
      include: { ingredient: true },
    });
  }

  async updateRecipeIngredient(
    recipeId: number,
    ingredientId: number,
    data: { quantity?: number; unit?: string; note?: string }
  ) {
    return prisma.recipeIngredient.update({
      where: {
        recipeId_ingredientId: { recipeId, ingredientId },
      },
      data,
      include: { ingredient: true },
    });
  }

  async removeIngredient(recipeId: number, ingredientId: number): Promise<boolean> {
    await prisma.recipeIngredient.delete({
      where: {
        recipeId_ingredientId: { recipeId, ingredientId },
      },
    });
    return true;
  }

  // ============================================
  // RECIPE TAGS MANAGEMENT
  // ============================================
  async addTag(recipeId: number, tagId: number) {
    return prisma.recipeTag.create({
      data: { recipeId, tagId },
      include: { tag: true },
    });
  }

  async removeTag(recipeId: number, tagId: number): Promise<boolean> {
    await prisma.recipeTag.delete({
      where: {
        recipeId_tagId: { recipeId, tagId },
      },
    });
    return true;
  }
}

export const recipeService = new RecipeService();
