import prisma from "../db";
import { rethrowIfNotFound } from "./service.helpers";

export type SourceTypeValue = "MANUAL" | "IMPORTED" | "AI_GENERATED";

/**
 * Hàm chuyển đổi từ model database sang format frontend mong đợi.
 */
const mapRecipeToResponse = (recipe: any) => {
    const { recipeTags = [], recipeIngredients = [], ...rest } = recipe;

    // Phân loại tags và cookware từ recipeTags
    const tags = recipeTags
        .filter((rt: any) => rt.tag.category !== 'Cookware')
        .map((rt: any) => rt.tag.name);

    const cookware = recipeTags
        .filter((rt: any) => rt.tag.category === 'Cookware')
        .map((rt: any) => rt.tag.name);

    // Chuẩn hóa recipeIngredients: id thành string, icon → emoji
    const normalizedIngredients = recipeIngredients.map((rI: any) => ({
        ...rI,
        ingredient: {
            ...rI.ingredient,
            id: String(rI.ingredient.id),
            emoji: rI.ingredient.icon,
        },
    }));

    return {
        ...rest,
        id: String(recipe.id),
        imageUrl: recipe.imageRecipe,
        timeMinutes: recipe.totalTime,
        tags,
        cookware,
        recipeIngredients: normalizedIngredients,
    };
};

export type CreateRecipeInput = {
    userId: string;
    name: string;
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
    const recipes = await prisma.recipe.findMany({
        where: {
            userId: filters.userId,
            sourceType: filters.sourceType,
        },
        include: {
            recipeTags: {
                include: {
                    tag: true
                }
            }
        },
        orderBy: { createdAt: "desc" },
    });

    return recipes.map(mapRecipeToResponse);
};

// Hàm lấy chi tiết recipe theo ID
export const getRecipeById = async (id: number) => {
    const recipe = await prisma.recipe.findUnique({
        where: { id },
        include: {
            recipeTags: {
                include: {
                    tag: true
                }
            },
            steps: {
                orderBy: { stepNumber: 'asc' }
            },
            recipeIngredients: {
                include: {
                    ingredient: true
                }
            }
        },
    });

    if (!recipe) return null;
    return mapRecipeToResponse(recipe);
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