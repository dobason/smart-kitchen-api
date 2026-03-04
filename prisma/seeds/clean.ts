import { PrismaClient } from "@prisma/client";

export async function cleanDatabase(prisma: PrismaClient) {
  console.log("🧹 Cleaning database...");

  // Delete in order to respect foreign key constraints
  await prisma.cookbookRecipe.deleteMany();
  await prisma.cookbook.deleteMany();
  await prisma.recipeTag.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.recipeIngredient.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.step.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.user.deleteMany();

  console.log("✅ Database cleaned");
}
