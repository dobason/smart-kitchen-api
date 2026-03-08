import prisma from "../db";
import { rethrowIfNotFound } from "./service.helpers";

export type CreateIngredientInput = {
    name: string;
    icon?: string;
};

export type UpdateIngredientInput = Partial<CreateIngredientInput>;

// Hàm lấy tất cả nguyên liệu
export const getAllIngredients = async () => {
    return await prisma.ingredient.findMany({
        orderBy: { createdAt: "desc" },
    });
};

// Hàm lấy chi tiết nguyên liệu theo ID
export const getIngredientById = async (id: number) => {
    return await prisma.ingredient.findUnique({
        where: { id },
    });
};

// Hàm tạo nguyên liệu mới
export const createIngredient = async (data: CreateIngredientInput) => {
    return await prisma.ingredient.create({
        data,
    });
};

// Hàm cập nhật nguyên liệu
export const updateIngredient = async (id: number, data: UpdateIngredientInput) => {
    try {
        return await prisma.ingredient.update({
            where: { id },
            data,
        });
    } catch (error) {
        rethrowIfNotFound(error, "Ingredient");
    }
};

// Hàm xóa nguyên liệu
export const deleteIngredient = async (id: number) => {
    try {
        return await prisma.ingredient.delete({
            where: { id },
        });
    } catch (error) {
        rethrowIfNotFound(error, "Ingredient");
    }
};