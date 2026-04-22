import prisma from "../db";
import { rethrowIfNotFound } from "./service.helpers";

export type CreateCookbookRecipeInput = {
    recipeId: number;
    cookbookId: number;
};

export type UpdateCookbookRecipeInput = Partial<CreateCookbookRecipeInput>;
export type CookbookRecipeFilter = {
    userId: string;
    recipeId?: number;
    cookbookId?: number;
};

// Hàm lấy tất cả cookbook recipe, có thể lọc theo recipeId và cookbookId
export const getAllCookbookRecipes = async (filters: CookbookRecipeFilter) => {
    return await prisma.cookbookRecipe.findMany({
        where: {
            recipeId: filters.recipeId,
            cookbookId: filters.cookbookId,
            cookbook: {
                is: {
                    userId: filters.userId,
                },
            },
        },
        include: { recipe: true },
        orderBy: [{ cookbookId: "asc" }, { recipeId: "asc" }],
    });
};

// Hàm lấy chi tiết cookbook recipe theo khóa kép
export const getCookbookRecipeById = async (recipeId: number, cookbookId: number, userId: string) => {
    return await prisma.cookbookRecipe.findFirst({
        where: {
            recipeId,
            cookbookId,
            cookbook: {
                is: {
                    userId,
                },
            },
        },
    });
};

// Hàm tạo liên kết cookbook và recipe (upsert để tránh lỗi duplicate)
export const createCookbookRecipe = async (data: CreateCookbookRecipeInput, userId: string) => {
    try {
        await prisma.cookbook.findFirstOrThrow({
            where: {
                id: data.cookbookId,
                userId,
            },
        });

        return await prisma.cookbookRecipe.upsert({
            where: {
                recipeId_cookbookId: {
                    recipeId: data.recipeId,
                    cookbookId: data.cookbookId,
                },
            },
            update: {}, // already exists — do nothing
            create: data,
        });
    } catch (error) {
        rethrowIfNotFound(error, "CookbookRecipe");
    }
};

// Hàm cập nhật liên kết cookbook và recipe
export const updateCookbookRecipe = async (
    recipeId: number,
    cookbookId: number,
    userId: string,
    data: UpdateCookbookRecipeInput,
) => {
    try {
        await prisma.cookbookRecipe.findFirstOrThrow({
            where: {
                recipeId,
                cookbookId,
                cookbook: {
                    is: {
                        userId,
                    },
                },
            },
        });

        return await prisma.cookbookRecipe.update({
            where: {
                recipeId_cookbookId: {
                    recipeId,
                    cookbookId,
                },
            },
            data,
        });
    } catch (error) {
        rethrowIfNotFound(error, "CookbookRecipe");
    }
};

// Hàm xóa liên kết cookbook và recipe
export const deleteCookbookRecipe = async (recipeId: number, cookbookId: number, userId: string) => {
    try {
        await prisma.cookbookRecipe.findFirstOrThrow({
            where: {
                recipeId,
                cookbookId,
                cookbook: {
                    is: {
                        userId,
                    },
                },
            },
        });

        return await prisma.cookbookRecipe.delete({
            where: {
                recipeId_cookbookId: {
                    recipeId,
                    cookbookId,
                },
            },
        });
    } catch (error) {
        rethrowIfNotFound(error, "CookbookRecipe");
    }
};