import { PrismaClient } from "@prisma/client";
import {
  cleanDatabase,
  seedUsers,
  seedIngredients,
  seedTags,
  seedRecipes,
  seedCookbooks,
} from "./seeds";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting database seeding...\n");

  const startTime = Date.now();

  // Step 1: Clean existing data
  await cleanDatabase(prisma);
  console.log("");

  // Step 2: Seed users
  const users = await seedUsers(prisma);
  console.log("");

  // Step 3: Seed ingredients
  const ingredients = await seedIngredients(prisma);
  console.log("");

  // Step 4: Seed tags
  const tags = await seedTags(prisma);
  console.log("");

  // Step 5: Seed recipes (with steps, ingredients, and tags)
  const recipes = await seedRecipes({ prisma, users, ingredients, tags });
  console.log("");

  // Step 6: Seed cookbooks
  await seedCookbooks({ prisma, users, recipes });
  console.log("");

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`🎉 Database seeded successfully in ${duration}s!`);

  // Summary
  console.log("\n📊 Seed Summary:");
  console.log(`   - Users: 2`);
  console.log(`   - Ingredients: 20`);
  console.log(`   - Tags: 26`);
  console.log(`   - Recipes: 4`);
  console.log(`   - Cookbooks: 5`);
}

main()
  .catch((e) => {
    console.error("\n❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
