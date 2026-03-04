import { prisma } from "../lib/prisma";
import type { User } from "@prisma/client";

export type SafeUser = User;

const userSelect = {
  userId: true,
  username: true,
  avatarUrl: true,
  createdAt: true,
  updatedAt: true,
} as const;

export class UserService {
  async findAll(): Promise<SafeUser[]> {
    return prisma.user.findMany({ select: userSelect });
  }

  async findById(userId: string): Promise<SafeUser | null> {
    return prisma.user.findUnique({ where: { userId }, select: userSelect });
  }

  // Upsert local profile keyed by Clerk userId — call after first sign-in
  async upsert(userId: string, data?: { username?: string; avatarUrl?: string }): Promise<SafeUser> {
    return prisma.user.upsert({
      where: { userId },
      create: {
        userId,
        username: data?.username ?? userId,
        avatarUrl: data?.avatarUrl,
      },
      update: {
        ...(data?.username && { username: data.username }),
        ...(data?.avatarUrl !== undefined && { avatarUrl: data.avatarUrl }),
      },
      select: userSelect,
    });
  }

  async update(
    userId: string,
    data: { username?: string; avatarUrl?: string }
  ): Promise<SafeUser | null> {
    return prisma.user.update({ where: { userId }, data, select: userSelect });
  }

  async delete(userId: string): Promise<boolean> {
    await prisma.user.delete({ where: { userId } });
    return true;
  }

  async getUserWithRecipes(userId: string) {
    return prisma.user.findUnique({
      where: { userId },
      select: {
        ...userSelect,
        recipes: {
          include: {
            _count: { select: { steps: true, recipeIngredients: true } },
          },
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: { recipes: true, cookbooks: true },
        },
      },
    });
  }
}

export const userService = new UserService();
