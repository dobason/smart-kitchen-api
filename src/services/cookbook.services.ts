import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

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
export const createCookbook = async (data: { title: string; description?: string }) => {
    return await prisma.cookbook.create({
        data,
    });
};

// Hàm cập nhật công thức
export const updateCookbook = async (id: number, data: { title?: string; description?: string }) => {
    return await prisma.cookbook.update({
        where: { id },
        data,
    });
};

// Hàm xóa công thức
export const deleteCookbook = async (id: number) => {
    return await prisma.cookbook.delete({
        where: { id },
    });
};