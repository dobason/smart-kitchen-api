import prisma from "../db";
import { rethrowIfNotFound } from "./service.helpers";

export type CreateStepInput = {
    recipeId: number;
    stepNumber: number;
    instruction: string;
    tip?: string;
    time?: number;
};

export type UpdateStepInput = Partial<CreateStepInput>;
export type StepFilter = {
    recipeId?: number;
};

// Hàm lấy tất cả step, có thể lọc theo recipeId
export const getAllSteps = async (filters: StepFilter = {}) => {
    return await prisma.step.findMany({
        where: {
            recipeId: filters.recipeId,
        },
        orderBy: [{ recipeId: "asc" }, { stepNumber: "asc" }],
    });
};

// Hàm lấy chi tiết step theo ID
export const getStepById = async (id: number) => {
    return await prisma.step.findUnique({
        where: { id },
    });
};

// Hàm tạo step mới
export const createStep = async (data: CreateStepInput) => {
    return await prisma.step.create({
        data,
    });
};

// Hàm cập nhật step
export const updateStep = async (id: number, data: UpdateStepInput) => {
    try {
        return await prisma.step.update({
            where: { id },
            data,
        });
    } catch (error) {
        rethrowIfNotFound(error, "Step");
    }
};

// Hàm xóa step
export const deleteStep = async (id: number) => {
    try {
        return await prisma.step.delete({
            where: { id },
        });
    } catch (error) {
        rethrowIfNotFound(error, "Step");
    }
};