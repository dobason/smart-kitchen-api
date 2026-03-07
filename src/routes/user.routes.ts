import { Elysia, t } from "elysia";

export const userRoutes = new Elysia({ prefix: "v1/users" })

    // 1. Lấy tất cả users (GET)
    .get("/", async ({ set }) => {
        try {
            // TODO: implement getAllUsers in user.services.ts
            return { success: true, data: [] };
        } catch (error) {
            set.status = 500;
            return { success: false, message: "Lỗi khi lấy danh sách người dùng", error: String(error) };
        }
    });