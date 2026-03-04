import { PrismaClient } from "@prisma/client";

export async function seedTags(prisma: PrismaClient) {
  console.log("🌱 Seeding tags...");

  const tags = await prisma.tag.createManyAndReturn({
    data: [
      // Meal Type
      { name: "Breakfast", category: "Meal Type" },
      { name: "Lunch", category: "Meal Type" },
      { name: "Dinner", category: "Meal Type" },
      { name: "Dessert", category: "Meal Type" },
      { name: "Snack", category: "Meal Type" },
      { name: "Appetizer", category: "Meal Type" },

      // Difficulty
      { name: "Quick & Easy", category: "Difficulty" },
      { name: "Intermediate", category: "Difficulty" },
      { name: "Advanced", category: "Difficulty" },

      // Diet
      { name: "Vegetarian", category: "Diet" },
      { name: "Vegan", category: "Diet" },
      { name: "Gluten-Free", category: "Diet" },
      { name: "Keto", category: "Diet" },
      { name: "Low-Carb", category: "Diet" },
      { name: "Healthy", category: "Diet" },

      // Cuisine
      { name: "Italian", category: "Cuisine" },
      { name: "Mexican", category: "Cuisine" },
      { name: "Asian", category: "Cuisine" },
      { name: "American", category: "Cuisine" },
      { name: "Mediterranean", category: "Cuisine" },
      { name: "French", category: "Cuisine" },

      // Cooking Method
      { name: "Grilled", category: "Cooking Method" },
      { name: "Baked", category: "Cooking Method" },
      { name: "Fried", category: "Cooking Method" },
      { name: "Slow Cooker", category: "Cooking Method" },
      { name: "No-Cook", category: "Cooking Method" },
    ],
  });

  console.log(`✅ ${tags.length} tags created`);

  // Return as object for easy access
  const tagMap = {
    breakfast: tags.find((t) => t.name === "Breakfast")!,
    lunch: tags.find((t) => t.name === "Lunch")!,
    dinner: tags.find((t) => t.name === "Dinner")!,
    dessert: tags.find((t) => t.name === "Dessert")!,
    snack: tags.find((t) => t.name === "Snack")!,
    appetizer: tags.find((t) => t.name === "Appetizer")!,
    quick: tags.find((t) => t.name === "Quick & Easy")!,
    intermediate: tags.find((t) => t.name === "Intermediate")!,
    advanced: tags.find((t) => t.name === "Advanced")!,
    vegetarian: tags.find((t) => t.name === "Vegetarian")!,
    vegan: tags.find((t) => t.name === "Vegan")!,
    glutenFree: tags.find((t) => t.name === "Gluten-Free")!,
    keto: tags.find((t) => t.name === "Keto")!,
    lowCarb: tags.find((t) => t.name === "Low-Carb")!,
    healthy: tags.find((t) => t.name === "Healthy")!,
    italian: tags.find((t) => t.name === "Italian")!,
    mexican: tags.find((t) => t.name === "Mexican")!,
    asian: tags.find((t) => t.name === "Asian")!,
    american: tags.find((t) => t.name === "American")!,
    mediterranean: tags.find((t) => t.name === "Mediterranean")!,
    french: tags.find((t) => t.name === "French")!,
    grilled: tags.find((t) => t.name === "Grilled")!,
    baked: tags.find((t) => t.name === "Baked")!,
    fried: tags.find((t) => t.name === "Fried")!,
    slowCooker: tags.find((t) => t.name === "Slow Cooker")!,
    noCook: tags.find((t) => t.name === "No-Cook")!,
  };

  return tagMap;
}

export type TagMap = Awaited<ReturnType<typeof seedTags>>;
