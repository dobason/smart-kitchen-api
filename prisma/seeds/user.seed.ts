import { PrismaClient } from "@prisma/client";

export async function seedUsers(prisma: PrismaClient) {
  console.log("🌱 Seeding users...");

  const user1 = await prisma.user.create({
    data: {
      userId: "user_seed_masterchef",
      username: "MasterChef",
      avatarUrl: "https://example.com/avatar1.jpg",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      userId: "user_seed_homebaker",
      username: "HomeBaker",
      avatarUrl: "https://example.com/avatar2.jpg",
    },
  });

  console.log("✅ Users created");

  return { user1, user2 };
}
