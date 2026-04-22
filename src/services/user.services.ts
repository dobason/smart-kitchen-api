import prisma from "../db";
import { rethrowIfNotFound } from "./service.helpers";

export type CreateUserInput = {
    userId?: string;
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
    const { userId, ...rest } = data;
    return await prisma.user.create({
        data: userId ? { userId, ...rest } : rest,
    });
};

// Hàm upsert người dùng (tạo nếu chưa có, cập nhật nếu đã có)
export const upsertUser = async (data: CreateUserInput) => {
    const { userId, email, username, avartarUrl } = data;
    
    return await prisma.user.upsert({
        where: { email },
        update: {
            ...(userId ? { userId } : {}),
            username,
            avartarUrl,
        },
        create: {
            ...(userId ? { userId } : {}),
            email,
            username,
            avartarUrl
        },
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
// Hàm đồng bộ thông tin user từ Clerk
export const syncClerkUser = async (clerkUserId: string) => {
    const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
    
    if (!CLERK_SECRET_KEY) {
        throw new Error("CLERK_SECRET_KEY is not defined");
    }

    try {
        const response = await fetch(`https://api.clerk.com/v1/users/${clerkUserId}`, {
            headers: {
                'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to fetch user from Clerk: ${errorBody}`);
        }

        const clerkUser: any = await response.json();
        
        // Lấy email chính (primary) hoặc email đầu tiên
        const primaryEmailId = clerkUser.primary_email_address_id;
        const emailObj = clerkUser.email_addresses.find((e: any) => e.id === primaryEmailId) || clerkUser.email_addresses[0];
        const email = emailObj?.email_address;

        if (!email) {
            throw new Error(`User ${clerkUserId} has no email address in Clerk`);
        }

        // Ưu tiên username, sau đó đến first_name + last_name, cuối cùng là phần trước @ của email
        const fullName = [clerkUser.first_name, clerkUser.last_name].filter(Boolean).join(' ');
        const username = clerkUser.username || fullName || email.split('@')[0];
        
        const avartarUrl = clerkUser.image_url || clerkUser.profile_image_url;

        return await upsertUser({
            userId: clerkUserId,
            email,
            username,
            avartarUrl
        });
    } catch (error) {
        console.error("Error syncing user with Clerk:", error);
        throw error;
    }
};
