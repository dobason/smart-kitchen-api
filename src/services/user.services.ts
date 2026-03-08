import prisma from "../db";
import { rethrowIfNotFound } from "./service.helpers";

export type CreateUserInput = {
    email: string;
    passwordHash: string;
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
export const getUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: { id },
    });
};

// Hàm tạo người dùng mới
export const createUser = async (data: CreateUserInput) => {
    return await prisma.user.create({
        data,
    });
};

// Hàm cập nhật người dùng
export const updateUser = async (id: number, data: UpdateUserInput) => {
    try {
        return await prisma.user.update({
            where: { id },
            data,
        });
    } catch (error) {
        rethrowIfNotFound(error, "User");
    }
};

// Hàm xóa người dùng
export const deleteUser = async (id: number) => {
    try {
        return await prisma.user.delete({
            where: { id },
        });
    } catch (error) {
        rethrowIfNotFound(error, "User");
    }
};
