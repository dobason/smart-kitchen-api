import prisma from "../db";
import { rethrowIfNotFound } from "./service.helpers";

export type SourceTypeValue = "MANUAL" | "IMPORTED" | "AI_GENERATED";

/**
 * Hàm chuyển đổi từ model database sang format frontend mong đợi.
 */
const mapRecipeToResponse = (recipe: any) => {
    try {
        const { recipeTags = [], recipeIngredients = [], ...rest } = recipe;

        // Phân loại tags và cookware từ recipeTags
        const tags = recipeTags
            .filter((rt: any) => rt.tag && rt.tag.category !== 'Cookware')
            .map((rt: any) => rt.tag.name);

        const cookware = recipeTags
            .filter((rt: any) => rt.tag && rt.tag.category === 'Cookware')
            .map((rt: any) => rt.tag.name);

        // Chuẩn hóa recipeIngredients: id thành string, icon → emoji
        const normalizedIngredients = recipeIngredients.map((rI: any) => {
            if (!rI.ingredient) return rI;
            return {
                ...rI,
                ingredient: {
                    ...rI.ingredient,
                    id: String(rI.ingredient.id),
                    emoji: rI.ingredient.icon,
                },
            };
        });

        return {
            ...rest,
            id: String(recipe.id),
            imageUrl: recipe.imageRecipe,
            timeMinutes: recipe.totalTime,
            tags,
            cookware,
            recipeIngredients: normalizedIngredients,
        };
    } catch (err) {
        console.error("Error mapping recipe:", recipe.id, err);
        throw err;
    }
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

export type UpdateRecipeInput = Partial<Omit<CreateRecipeInput, "userId">>;
export type RecipeFilter = {
    sourceType?: SourceTypeValue;
    userId?: string;
    keyword?: string;
};

// Hàm lấy tất cả recipe, có thể lọc theo sourceType, userId và keyword
export const getAllRecipes = async (filters: RecipeFilter = {}) => {
    try {
        const { sourceType, userId, keyword } = filters;
        
        const recipes = await prisma.recipe.findMany({
            where: {
                ...(sourceType && { sourceType }),
                ...(userId && { userId }),
                ...(keyword && {
                    OR: [
                        { name: { contains: keyword, mode: 'insensitive' } },
                        { description: { contains: keyword, mode: 'insensitive' } },
                    ]
                }),
            },
            include: {
                recipeTags: {
                    include: {
                        tag: true
                    }
                },
                recipeIngredients: {
                    include: {
                        ingredient: true
                    }
                }
            },
            orderBy: { createdAt: "desc" },
        });

        return recipes.map(mapRecipeToResponse);
    } catch (error) {
        console.error("Error in getAllRecipes:", error);
        throw error;
    }
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