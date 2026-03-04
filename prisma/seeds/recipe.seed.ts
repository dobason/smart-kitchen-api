import { PrismaClient, SourceType } from "@prisma/client";
import type { IngredientMap } from "./ingredient.seed";
import type { TagMap } from "./tag.seed";

interface SeedRecipesParams {
  prisma: PrismaClient;
  users: { user1: { userId: string }; user2: { userId: string } };
  ingredients: IngredientMap;
  tags: TagMap;
}

export async function seedRecipes({
  prisma,
  users,
  ingredients,
  tags,
}: SeedRecipesParams) {
  console.log("🌱 Seeding recipes...");

  // Recipe 1: Fluffy Pancakes
  const pancakeRecipe = await prisma.recipe.create({
    data: {
      userId: users.user1.userId,
      recipesName: "Fluffy Pancakes",
      description:
        "Light and fluffy pancakes perfect for weekend breakfast. Golden brown on the outside, soft on the inside.",
      imageRecipe: "https://example.com/pancakes.jpg",
      totalTime: 30,
      calories: 350,
      protein: 8,
      carbs: 45,
      fats: 12,
      sourceType: SourceType.text,
      numberOfServes: 4,
      steps: {
        create: [
          {
            stepNumber: 1,
            instruction:
              "Mix flour, sugar, baking powder, and salt in a large bowl",
            tip: "Sift the flour for extra fluffy pancakes",
            time: 5,
          },
          {
            stepNumber: 2,
            instruction:
              "In another bowl, whisk eggs, milk, and melted butter",
            time: 3,
          },
          {
            stepNumber: 3,
            instruction:
              "Pour wet ingredients into dry ingredients and mix until just combined",
            tip: "Don't overmix - lumps are okay!",
            time: 2,
          },
          {
            stepNumber: 4,
            instruction:
              "Heat a non-stick pan over medium heat and pour 1/4 cup batter per pancake",
            time: 15,
          },
          {
            stepNumber: 5,
            instruction:
              "Flip when bubbles form on surface, cook until golden brown",
            time: 5,
          },
        ],
      },
      recipeIngredients: {
        create: [
          {
            ingredientId: ingredients.flour.ingredientId,
            quantity: 2,
            unit: "cups",
          },
          {
            ingredientId: ingredients.sugar.ingredientId,
            quantity: 2,
            unit: "tbsp",
          },
          {
            ingredientId: ingredients.eggs.ingredientId,
            quantity: 2,
            unit: "pieces",
          },
          {
            ingredientId: ingredients.milk.ingredientId,
            quantity: 1.5,
            unit: "cups",
          },
          {
            ingredientId: ingredients.butter.ingredientId,
            quantity: 3,
            unit: "tbsp",
            note: "melted",
          },
          {
            ingredientId: ingredients.bakingPowder.ingredientId,
            quantity: 2,
            unit: "tsp",
          },
        ],
      },
      recipeTags: {
        create: [
          { tagId: tags.breakfast.tagId },
          { tagId: tags.quick.tagId },
          { tagId: tags.vegetarian.tagId },
          { tagId: tags.american.tagId },
        ],
      },
    },
  });

  // Recipe 2: Garlic Herb Grilled Chicken
  const grilledChickenRecipe = await prisma.recipe.create({
    data: {
      userId: users.user1.userId,
      recipesName: "Garlic Herb Grilled Chicken",
      description:
        "Juicy grilled chicken with garlic and herbs. Perfect for a healthy dinner.",
      imageRecipe: "https://example.com/chicken.jpg",
      totalTime: 45,
      calories: 280,
      protein: 35,
      carbs: 2,
      fats: 14,
      sourceType: SourceType.text,
      numberOfServes: 4,
      steps: {
        create: [
          {
            stepNumber: 1,
            instruction: "Mix olive oil, minced garlic, salt, and pepper in a bowl",
            time: 5,
          },
          {
            stepNumber: 2,
            instruction: "Marinate chicken breasts for at least 30 minutes",
            tip: "For best results, marinate overnight in the refrigerator",
            time: 30,
          },
          {
            stepNumber: 3,
            instruction: "Preheat grill to medium-high heat",
            time: 5,
          },
          {
            stepNumber: 4,
            instruction:
              "Grill chicken 6-7 minutes per side until internal temp reaches 165°F",
            tip: "Let rest for 5 minutes before slicing",
            time: 15,
          },
        ],
      },
      recipeIngredients: {
        create: [
          {
            ingredientId: ingredients.chicken.ingredientId,
            quantity: 4,
            unit: "pieces",
          },
          {
            ingredientId: ingredients.garlic.ingredientId,
            quantity: 4,
            unit: "cloves",
            note: "minced",
          },
          {
            ingredientId: ingredients.oliveOil.ingredientId,
            quantity: 3,
            unit: "tbsp",
          },
          {
            ingredientId: ingredients.salt.ingredientId,
            quantity: 1,
            unit: "tsp",
          },
          {
            ingredientId: ingredients.pepper.ingredientId,
            quantity: 0.5,
            unit: "tsp",
          },
        ],
      },
      recipeTags: {
        create: [
          { tagId: tags.dinner.tagId },
          { tagId: tags.healthy.tagId },
          { tagId: tags.grilled.tagId },
          { tagId: tags.keto.tagId },
        ],
      },
    },
  });

  // Recipe 3: Classic Chocolate Cake
  const chocolateCakeRecipe = await prisma.recipe.create({
    data: {
      userId: users.user2.userId,
      recipesName: "Classic Chocolate Cake",
      description:
        "Rich and moist chocolate cake with a decadent chocolate frosting. Perfect for celebrations!",
      imageRecipe: "https://example.com/chocolate-cake.jpg",
      totalTime: 90,
      calories: 450,
      protein: 6,
      carbs: 65,
      fats: 22,
      sourceType: SourceType.text,
      numberOfServes: 12,
      steps: {
        create: [
          {
            stepNumber: 1,
            instruction: "Preheat oven to 350°F (175°C). Grease and flour two 9-inch cake pans",
            time: 10,
          },
          {
            stepNumber: 2,
            instruction: "Mix flour, sugar, cocoa powder, baking powder, and salt in a large bowl",
            time: 5,
          },
          {
            stepNumber: 3,
            instruction: "Add eggs, milk, oil, and vanilla. Beat for 2 minutes",
            time: 5,
          },
          {
            stepNumber: 4,
            instruction: "Pour batter into prepared pans and bake for 30-35 minutes",
            tip: "Cake is done when toothpick inserted in center comes out clean",
            time: 35,
          },
          {
            stepNumber: 5,
            instruction: "Cool in pans for 10 minutes, then remove and cool completely",
            time: 30,
          },
          {
            stepNumber: 6,
            instruction: "Frost with your favorite chocolate frosting",
            time: 15,
          },
        ],
      },
      recipeIngredients: {
        create: [
          {
            ingredientId: ingredients.flour.ingredientId,
            quantity: 2,
            unit: "cups",
          },
          {
            ingredientId: ingredients.sugar.ingredientId,
            quantity: 2,
            unit: "cups",
          },
          {
            ingredientId: ingredients.cocoa.ingredientId,
            quantity: 0.75,
            unit: "cups",
          },
          {
            ingredientId: ingredients.eggs.ingredientId,
            quantity: 3,
            unit: "pieces",
          },
          {
            ingredientId: ingredients.milk.ingredientId,
            quantity: 1,
            unit: "cup",
          },
          {
            ingredientId: ingredients.vanilla.ingredientId,
            quantity: 2,
            unit: "tsp",
          },
        ],
      },
      recipeTags: {
        create: [
          { tagId: tags.dessert.tagId },
          { tagId: tags.baked.tagId },
          { tagId: tags.vegetarian.tagId },
          { tagId: tags.intermediate.tagId },
        ],
      },
    },
  });

  // Recipe 4: Creamy Pasta Carbonara
  const carbonaraRecipe = await prisma.recipe.create({
    data: {
      userId: users.user2.userId,
      recipesName: "Creamy Pasta Carbonara",
      description:
        "Authentic Italian carbonara with eggs, cheese, and crispy bacon. Simple yet elegant.",
      imageRecipe: "https://example.com/carbonara.jpg",
      totalTime: 25,
      calories: 520,
      protein: 22,
      carbs: 55,
      fats: 24,
      sourceType: SourceType.text,
      numberOfServes: 4,
      steps: {
        create: [
          {
            stepNumber: 1,
            instruction: "Bring a large pot of salted water to boil and cook pasta al dente",
            time: 12,
          },
          {
            stepNumber: 2,
            instruction: "While pasta cooks, whisk eggs and grated cheese in a bowl",
            time: 3,
          },
          {
            stepNumber: 3,
            instruction: "Reserve 1 cup pasta water, then drain pasta",
            tip: "Pasta water is key for a silky sauce",
            time: 1,
          },
          {
            stepNumber: 4,
            instruction: "Toss hot pasta with egg mixture off heat, adding pasta water as needed",
            tip: "Work quickly so eggs don't scramble",
            time: 3,
          },
          {
            stepNumber: 5,
            instruction: "Season with black pepper and serve immediately",
            time: 2,
          },
        ],
      },
      recipeIngredients: {
        create: [
          {
            ingredientId: ingredients.pasta.ingredientId,
            quantity: 400,
            unit: "g",
            note: "spaghetti or rigatoni",
          },
          {
            ingredientId: ingredients.eggs.ingredientId,
            quantity: 4,
            unit: "pieces",
            note: "plus 2 yolks",
          },
          {
            ingredientId: ingredients.cheese.ingredientId,
            quantity: 100,
            unit: "g",
            note: "Pecorino Romano, grated",
          },
          {
            ingredientId: ingredients.pepper.ingredientId,
            quantity: 1,
            unit: "tsp",
            note: "freshly ground",
          },
        ],
      },
      recipeTags: {
        create: [
          { tagId: tags.dinner.tagId },
          { tagId: tags.italian.tagId },
          { tagId: tags.quick.tagId },
        ],
      },
    },
  });

  console.log("✅ 4 recipes created");

  return {
    pancakeRecipe,
    grilledChickenRecipe,
    chocolateCakeRecipe,
    carbonaraRecipe,
  };
}

export type RecipeMap = Awaited<ReturnType<typeof seedRecipes>>;
