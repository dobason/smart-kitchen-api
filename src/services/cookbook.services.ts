import prisma from "../db";
import { rethrowIfNotFound } from "./service.helpers";

export type CreateCookbookInput = {
    name: string;
    userId: string;
};

export type UpdateCookbookInput = Partial<CreateCookbookInput>;
export type CookbookFilter = {
    userId?: string;
};

// Hàm lấy tất cả cookbook, có thể lọc theo userId
export const getAllCookbooks = async (filters: CookbookFilter = {}) => {
    return await prisma.cookbook.findMany({
        where: {
            userId: filters.userId,
        },
        orderBy: { createdAt: "desc" },
    });
};

// Hàm lấy chi tiết cookbook theo ID
export const getCookbookById = async (id: number) => {
    return await prisma.cookbook.findUnique({
        where: { id },
    });
};

// Hàm tạo cookbook mới
export const createCookbook = async (data: CreateCookbookInput) => {
    return await prisma.cookbook.create({
        data,
    });
};

// Hàm cập nhật cookbook
export const updateCookbook = async (id: number, data: UpdateCookbookInput) => {
    try {
        return await prisma.cookbook.update({
            where: { id },
            data,
        });
    } catch (error) {
        rethrowIfNotFound(error, "Cookbook");
    }
};

// Hàm xóa cookbook
export const deleteCookbook = async (id: number) => {
    try {
        return await prisma.cookbook.delete({
            where: { id },
        });
    } catch (error) {
        rethrowIfNotFound(error, "Cookbook");
    }
};