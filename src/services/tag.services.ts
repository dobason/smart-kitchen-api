import prisma from "../db";
import { rethrowIfNotFound } from "./service.helpers";

export type CreateTagInput = {
    name: string;
    category?: string;
};

export type UpdateTagInput = Partial<CreateTagInput>;

// Hàm lấy tất cả tag
export const getAllTags = async () => {
    return await prisma.tag.findMany({
        orderBy: { createdAt: "desc" },
    });
};

// Hàm lấy chi tiết tag theo ID
export const getTagById = async (id: number) => {
    return await prisma.tag.findUnique({
        where: { id },
    });
};

// Hàm tạo tag mới
export const createTag = async (data: CreateTagInput) => {
    return await prisma.tag.create({
        data,
    });
};

// Hàm cập nhật tag
export const updateTag = async (id: number, data: UpdateTagInput) => {
    try {
        return await prisma.tag.update({
            where: { id },
            data,
        });
    } catch (error) {
        rethrowIfNotFound(error, "Tag");
    }
};

// Hàm xóa tag
export const deleteTag = async (id: number) => {
    try {
        return await prisma.tag.delete({
            where: { id },
        });
    } catch (error) {
        rethrowIfNotFound(error, "Tag");
    }
};