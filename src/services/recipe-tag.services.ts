import prisma from "../db";
import { rethrowIfNotFound } from "./service.helpers";

export type CreateRecipeTagInput = {
    recipeId: number;
    tagId: number;
};

export type UpdateRecipeTagInput = Partial<CreateRecipeTagInput>;
export type RecipeTagFilter = {
    recipeId?: number;
    tagId?: number;
};

// Hàm lấy tất cả recipe tag, có thể lọc theo recipeId và tagId
export const getAllRecipeTags = async (filters: RecipeTagFilter = {}) => {
    return await prisma.recipeTag.findMany({
        where: {
            recipeId: filters.recipeId,
            tagId: filters.tagId,
        },
        orderBy: [{ recipeId: "asc" }, { tagId: "asc" }],
    });
};

// Hàm lấy chi tiết recipe tag theo khóa kép
export const getRecipeTagById = async (recipeId: number, tagId: number) => {
    return await prisma.recipeTag.findUnique({
        where: {
            recipeId_tagId: {
                recipeId,
                tagId,
            },
        },
    });
};

// Hàm tạo liên kết recipe và tag
export const createRecipeTag = async (data: CreateRecipeTagInput) => {
    return await prisma.recipeTag.create({
        data,
    });
};

// Hàm cập nhật liên kết recipe và tag
export const updateRecipeTag = async (recipeId: number, tagId: number, data: UpdateRecipeTagInput) => {
    try {
        return await prisma.recipeTag.update({
            where: {
                recipeId_tagId: {
                    recipeId,
                    tagId,
                },
            },
            data,
        });
    } catch (error) {
        rethrowIfNotFound(error, "RecipeTag");
    }
};

// Hàm xóa liên kết recipe và tag
export const deleteRecipeTag = async (recipeId: number, tagId: number) => {
    try {
        return await prisma.recipeTag.delete({
            where: {
                recipeId_tagId: {
                    recipeId,
                    tagId,
                },
            },
        });
    } catch (error) {
        rethrowIfNotFound(error, "RecipeTag");
    }
};