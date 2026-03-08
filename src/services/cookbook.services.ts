import { Prisma } from "@prisma/client";
import prisma from "../db";

// Hàm lấy tất cả công thức
export const getAllCookbooks = async () => {
    return await prisma.cookbook.findMany({
        orderBy: { createdAt: "desc" },
    });
};

// Hàm lấy 1 công thức theo ID
export const getCookbookById = async (id: number) => {
    return await prisma.cookbook.findUnique({
        where: { id },
    });
};

// Hàm tạo công thức mới
export const createCookbook = async (data: Prisma.CookbookUncheckedCreateInput) => {
    return await prisma.cookbook.create({
        data,
    });
};

// Hàm cập nhật công thức
export const updateCookbook = async (id: number, data: Prisma.CookbookUncheckedUpdateInput) => {
    try {
        return await prisma.cookbook.update({
            where: { id },
            data,
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            throw Object.assign(new Error('Cookbook not found'), { code: 'P2025' });
        }
        throw error;
    }
};

// Hàm xóa công thức
export const deleteCookbook = async (id: number) => {
    try {
        return await prisma.cookbook.delete({
            where: { id },
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            throw Object.assign(new Error('Cookbook not found'), { code: 'P2025' });
        }
        throw error;
    }
};