import prisma from "../db";
import { rethrowIfNotFound } from "./service.helpers";

export type SourceTypeValue = "MANUAL" | "IMPORTED" | "AI_GENERATED";

export type CreateRecipeInput = {
    userId: string;
    recipesName: string;
    description?: string;
    imageRecipe?: string;
    totalTime?: number;
    calories?: number;
    protein?: number;
    carbs?: number;
    fats?: number;
    sourceType?: SourceTypeValue;
    numberOfServes?: number;
};

export type UpdateRecipeInput = Partial<CreateRecipeInput>;
export type RecipeFilter = {
    userId?: string;
    sourceType?: SourceTypeValue;
};

// Hàm lấy tất cả recipe, có thể lọc theo userId và sourceType
export const getAllRecipes = async (filters: RecipeFilter = {}) => {
    return await prisma.recipe.findMany({
        where: {
            userId: filters.userId,
            sourceType: filters.sourceType,
        },
        orderBy: { createdAt: "desc" },
    });
};

// Hàm lấy chi tiết recipe theo ID
export const getRecipeById = async (id: number) => {
    return await prisma.recipe.findUnique({
        where: { id },
    });
};

// Hàm tạo recipe mới
export const createRecipe = async (data: CreateRecipeInput) => {
    return await prisma.recipe.create({
        data,
    });
};

// Hàm cập nhật recipe
export const updateRecipe = async (id: number, data: UpdateRecipeInput) => {
    try {
        return await prisma.recipe.update({
            where: { id },
            data,
        });
    } catch (error) {
        rethrowIfNotFound(error, "Recipe");
    }
};

// Hàm xóa recipe
export const deleteRecipe = async (id: number) => {
    try {
        return await prisma.recipe.delete({
            where: { id },
        });
    } catch (error) {
        rethrowIfNotFound(error, "Recipe");
    }
};