import { PrismaClient } from "@prisma/client";

export async function seedIngredients(prisma: PrismaClient) {
  console.log("🌱 Seeding ingredients...");

  const ingredients = await prisma.ingredient.createManyAndReturn({
    data: [
      { name: "All-Purpose Flour", icon: "🌾" },
      { name: "Sugar", icon: "🍬" },
      { name: "Eggs", icon: "🥚" },
      { name: "Butter", icon: "🧈" },
      { name: "Milk", icon: "🥛" },
      { name: "Chicken Breast", icon: "🍗" },
      { name: "Garlic", icon: "🧄" },
      { name: "Olive Oil", icon: "🫒" },
      { name: "Salt", icon: "🧂" },
      { name: "Black Pepper", icon: "⚫" },
      { name: "Onion", icon: "🧅" },
      { name: "Tomato", icon: "🍅" },
      { name: "Cheese", icon: "🧀" },
      { name: "Rice", icon: "🍚" },
      { name: "Pasta", icon: "🍝" },
      { name: "Lemon", icon: "🍋" },
      { name: "Honey", icon: "🍯" },
      { name: "Vanilla Extract", icon: "🌿" },
      { name: "Baking Powder", icon: "🥄" },
      { name: "Cocoa Powder", icon: "🍫" },
    ],
  });

  console.log(`✅ ${ingredients.length} ingredients created`);

  // Return as object for easy access
  const ingredientMap = {
    flour: ingredients.find((i) => i.name === "All-Purpose Flour")!,
    sugar: ingredients.find((i) => i.name === "Sugar")!,
    eggs: ingredients.find((i) => i.name === "Eggs")!,
    butter: ingredients.find((i) => i.name === "Butter")!,
    milk: ingredients.find((i) => i.name === "Milk")!,
    chicken: ingredients.find((i) => i.name === "Chicken Breast")!,
    garlic: ingredients.find((i) => i.name === "Garlic")!,
    oliveOil: ingredients.find((i) => i.name === "Olive Oil")!,
    salt: ingredients.find((i) => i.name === "Salt")!,
    pepper: ingredients.find((i) => i.name === "Black Pepper")!,
    onion: ingredients.find((i) => i.name === "Onion")!,
    tomato: ingredients.find((i) => i.name === "Tomato")!,
    cheese: ingredients.find((i) => i.name === "Cheese")!,
    rice: ingredients.find((i) => i.name === "Rice")!,
    pasta: ingredients.find((i) => i.name === "Pasta")!,
    lemon: ingredients.find((i) => i.name === "Lemon")!,
    honey: ingredients.find((i) => i.name === "Honey")!,
    vanilla: ingredients.find((i) => i.name === "Vanilla Extract")!,
    bakingPowder: ingredients.find((i) => i.name === "Baking Powder")!,
    cocoa: ingredients.find((i) => i.name === "Cocoa Powder")!,
  };

  return ingredientMap;
}

export type IngredientMap = Awaited<ReturnType<typeof seedIngredients>>;
