import prisma from "../db";
import { rethrowIfNotFound } from "./service.helpers";

export type CreateRecipeIngredientInput = {
    recipeId: number;
    ingredientId: number;
    quantity?: number;
    unit?: string;
    note?: string;
};

export type UpdateRecipeIngredientInput = Partial<CreateRecipeIngredientInput>;
export type RecipeIngredientFilter = {
    recipeId?: number;
    ingredientId?: number;
};

// Hàm lấy tất cả recipe ingredient, có thể lọc theo recipeId và ingredientId
export const getAllRecipeIngredients = async (filters: RecipeIngredientFilter = {}) => {
    return await prisma.recipeIngredient.findMany({
        where: {
            recipeId: filters.recipeId,
            ingredientId: filters.ingredientId,
        },
        orderBy: [{ recipeId: "asc" }, { ingredientId: "asc" }],
    });
};

// Hàm lấy chi tiết recipe ingredient theo khóa kép
export const getRecipeIngredientById = async (recipeId: number, ingredientId: number) => {
    return await prisma.recipeIngredient.findUnique({
        where: {
            recipeId_ingredientId: {
                recipeId,
                ingredientId,
            },
        },
    });
};

// Hàm tạo liên kết recipe và ingredient
export const createRecipeIngredient = async (data: CreateRecipeIngredientInput) => {
    return await prisma.recipeIngredient.create({
        data,
    });
};

// Hàm cập nhật liên kết recipe và ingredient
export const updateRecipeIngredient = async (
    recipeId: number,
    ingredientId: number,
    data: UpdateRecipeIngredientInput,
) => {
    try {
        return await prisma.recipeIngredient.update({
            where: {
                recipeId_ingredientId: {
                    recipeId,
                    ingredientId,
                },
            },
            data,
        });
    } catch (error) {
        rethrowIfNotFound(error, "RecipeIngredient");
    }
};

// Hàm xóa liên kết recipe và ingredient
export const deleteRecipeIngredient = async (recipeId: number, ingredientId: number) => {
    try {
        return await prisma.recipeIngredient.delete({
            where: {
                recipeId_ingredientId: {
                    recipeId,
                    ingredientId,
                },
            },
        });
    } catch (error) {
        rethrowIfNotFound(error, "RecipeIngredient");
    }
};