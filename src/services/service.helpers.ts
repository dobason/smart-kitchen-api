export const isPrismaNotFoundError = (error: unknown) => {
    return (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code?: string }).code === "P2025"
    );
};

// Chuẩn hóa lỗi Prisma khi bản ghi không tồn tại
export const rethrowIfNotFound = (error: unknown, entityName: string) => {
    if (isPrismaNotFoundError(error)) {
        throw Object.assign(new Error(`${entityName} not found`), { code: "P2025" });
    }

    throw error;
};