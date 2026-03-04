import { PrismaClient } from "@prisma/client";
import type { RecipeMap } from "./recipe.seed";

interface SeedCookbooksParams {
  prisma: PrismaClient;
  users: { user1: { userId: string }; user2: { userId: string } };
  recipes: RecipeMap;
}

export async function seedCookbooks({
  prisma,
  users,
  recipes,
}: SeedCookbooksParams) {
  console.log("🌱 Seeding cookbooks...");

  // User 1's cookbooks
  const favoritesBook = await prisma.cookbook.create({
    data: {
      userId: users.user1.userId,
      name: "My Favorite Recipes",
      cookbookRecipes: {
        create: [
          { recipeId: recipes.pancakeRecipe.recipeId },
          { recipeId: recipes.grilledChickenRecipe.recipeId },
          { recipeId: recipes.carbonaraRecipe.recipeId },
        ],
      },
    },
  });

  const healthyBook = await prisma.cookbook.create({
    data: {
      userId: users.user1.userId,
      name: "Healthy Meals",
      cookbookRecipes: {
        create: [{ recipeId: recipes.grilledChickenRecipe.recipeId }],
      },
    },
  });

  const quickMealsBook = await prisma.cookbook.create({
    data: {
      userId: users.user1.userId,
      name: "Quick Meals (Under 30 min)",
      cookbookRecipes: {
        create: [
          { recipeId: recipes.pancakeRecipe.recipeId },
          { recipeId: recipes.carbonaraRecipe.recipeId },
        ],
      },
    },
  });

  // User 2's cookbooks
  const bakingBook = await prisma.cookbook.create({
    data: {
      userId: users.user2.userId,
      name: "Baking Collection",
      cookbookRecipes: {
        create: [
          { recipeId: recipes.chocolateCakeRecipe.recipeId },
          { recipeId: recipes.pancakeRecipe.recipeId },
        ],
      },
    },
  });

  const italianBook = await prisma.cookbook.create({
    data: {
      userId: users.user2.userId,
      name: "Italian Classics",
      cookbookRecipes: {
        create: [{ recipeId: recipes.carbonaraRecipe.recipeId }],
      },
    },
  });

  console.log("✅ 5 cookbooks created");

  return {
    favoritesBook,
    healthyBook,
    quickMealsBook,
    bakingBook,
    italianBook,
  };
}
