import { prisma } from "../lib/prisma";

export class CookbookService {
  async findByUser(userId: string) {
    return prisma.cookbook.findMany({
      where: { userId },
      include: {
        _count: { select: { cookbookRecipes: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(cookbookId: number) {
    return prisma.cookbook.findUnique({
      where: { cookbookId },
      include: {
        user: { select: { userId: true, username: true, avatarUrl: true } },
        cookbookRecipes: {
          include: {
            recipe: {
              include: {
                user: { select: { userId: true, username: true, avatarUrl: true } },
                recipeTags: { include: { tag: true } },
                _count: { select: { steps: true, recipeIngredients: true } },
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        _count: { select: { cookbookRecipes: true } },
      },
    });
  }

  async create(userId: string, name: string) {
    return prisma.cookbook.create({
      data: { userId, name },
      include: {
        _count: { select: { cookbookRecipes: true } },
      },
    });
  }

  async update(cookbookId: number, name: string) {
    return prisma.cookbook.update({
      where: { cookbookId },
      data: { name },
      include: {
        _count: { select: { cookbookRecipes: true } },
      },
    });
  }

  async delete(cookbookId: number): Promise<boolean> {
    await prisma.cookbook.delete({
      where: { cookbookId },
    });
    return true;
  }

  // Add recipe to cookbook
  async addRecipe(cookbookId: number, recipeId: number) {
    return prisma.cookbookRecipe.create({
      data: { cookbookId, recipeId },
      include: {
        recipe: {
          include: {
            user: { select: { userId: true, username: true } },
            recipeTags: { include: { tag: true } },
          },
        },
      },
    });
  }

  // Remove recipe from cookbook
  async removeRecipe(cookbookId: number, recipeId: number): Promise<boolean> {
    await prisma.cookbookRecipe.delete({
      where: {
        recipeId_cookbookId: { recipeId, cookbookId },
      },
    });
    return true;
  }

  // Check if recipe is in cookbook
  async hasRecipe(cookbookId: number, recipeId: number): Promise<boolean> {
    const record = await prisma.cookbookRecipe.findUnique({
      where: {
        recipeId_cookbookId: { recipeId, cookbookId },
      },
    });
    return !!record;
  }

  // Get cookbooks containing a recipe
  async getCookbooksWithRecipe(userId: string, recipeId: number) {
    return prisma.cookbook.findMany({
      where: {
        userId,
        cookbookRecipes: { some: { recipeId } },
      },
    });
  }
}

export const cookbookService = new CookbookService();
