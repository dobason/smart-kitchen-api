import { prisma } from "../lib/prisma";

export class IngredientService {
  async findAll(page = 1, limit = 50, search?: string) {
    const skip = (page - 1) * limit;
    const where = search ? { name: { contains: search, mode: "insensitive" as const } } : {};

    const [ingredients, total] = await Promise.all([
      prisma.ingredient.findMany({
        where,
        orderBy: { name: "asc" },
        skip,
        take: limit,
      }),
      prisma.ingredient.count({ where }),
    ]);

    return {
      data: ingredients,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(ingredientId: number) {
    return prisma.ingredient.findUnique({
      where: { ingredientId },
      include: {
        _count: { select: { recipeIngredients: true } },
      },
    });
  }

  async create(data: { name: string; icon?: string }) {
    return prisma.ingredient.create({
      data,
    });
  }

  async update(ingredientId: number, data: { name?: string; icon?: string }) {
    return prisma.ingredient.update({
      where: { ingredientId },
      data,
    });
  }

  async delete(ingredientId: number): Promise<boolean> {
    await prisma.ingredient.delete({
      where: { ingredientId },
    });
    return true;
  }

  // Find recipes using this ingredient
  async getRecipesWithIngredient(ingredientId: number, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [recipes, total] = await Promise.all([
      prisma.recipe.findMany({
        where: {
          recipeIngredients: { some: { ingredientId } },
        },
        include: {
          user: { select: { userId: true, username: true, avatarUrl: true } },
          recipeIngredients: {
            where: { ingredientId },
            include: { ingredient: true },
          },
        },
        skip,
        take: limit,
      }),
      prisma.recipe.count({
        where: { recipeIngredients: { some: { ingredientId } } },
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
}

export const ingredientService = new IngredientService();
