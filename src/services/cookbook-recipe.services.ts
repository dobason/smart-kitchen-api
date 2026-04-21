import prisma from "../db";
import { rethrowIfNotFound } from "./service.helpers";

export type CreateCookbookRecipeInput = {
    recipeId: number;
    cookbookId: number;
};

export type UpdateCookbookRecipeInput = Partial<CreateCookbookRecipeInput>;
export type CookbookRecipeFilter = {
    recipeId?: number;
    cookbookId?: number;
};

// Hàm lấy tất cả cookbook recipe, có thể lọc theo recipeId và cookbookId
export const getAllCookbookRecipes = async (filters: CookbookRecipeFilter = {}) => {
    return await prisma.cookbookRecipe.findMany({
        where: {
            recipeId: filters.recipeId,
            cookbookId: filters.cookbookId,
        },
        include: {recipe: true},
        orderBy: [{ cookbookId: "asc" }, { recipeId: "asc" }],
    });
};

// Hàm lấy chi tiết cookbook recipe theo khóa kép
export const getCookbookRecipeById = async (recipeId: number, cookbookId: number) => {
    return await prisma.cookbookRecipe.findUnique({
        where: {
            recipeId_cookbookId: {
                recipeId,
                cookbookId,
            },
        },
    });
};

// Hàm tạo liên kết cookbook và recipe
export const createCookbookRecipe = async (data: CreateCookbookRecipeInput) => {
    return await prisma.cookbookRecipe.create({
        data,
    });
};

// Hàm cập nhật liên kết cookbook và recipe
export const updateCookbookRecipe = async (
    recipeId: number,
    cookbookId: number,
    data: UpdateCookbookRecipeInput,
) => {
    try {
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
export const deleteCookbookRecipe = async (recipeId: number, cookbookId: number) => {
    try {
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