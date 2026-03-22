import prisma from "../db";
import { rethrowIfNotFound } from "./service.helpers";

export type CreateUserInput = {
    email: string;
    username: string;
    avartarUrl?: string;
};

export type UpdateUserInput = Partial<CreateUserInput>;

// Hàm lấy tất cả người dùng
export const getAllUsers = async () => {
    return await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
    });
};

// Hàm lấy chi tiết người dùng theo ID
export const getUserById = async (userId: string) => {
    return await prisma.user.findUnique({
        where: { userId },
    });
};

// Hàm tạo người dùng mới
export const createUser = async (data: CreateUserInput) => {
    return await prisma.user.create({
        data,
    });
};

// Hàm cập nhật người dùng
export const updateUser = async (userId: string, data: UpdateUserInput) => {
    try {
        return await prisma.user.update({
            where: { userId },
            data,
        });
    } catch (error) {
        rethrowIfNotFound(error, "User");
    }
};

// Hàm xóa người dùng
export const deleteUser = async (userId: string) => {
    try {
        return await prisma.user.delete({
            where: { userId },
        });
    } catch (error) {
        rethrowIfNotFound(error, "User");
    }
};
