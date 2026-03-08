import { Elysia, t } from "elysia";
import { getAllUsers } from "../services/user.services";

export const userRoutes = new Elysia({ prefix: "v1/users" })

    // 1. Lấy tất cả users (GET)
    .get("/", async ({ set }) => {
        try {
            const users = await getAllUsers();
            return { success: true, data: users };
        } catch (error) {
            console.error("Lỗi khi lấy danh sách người dùng:", error);
            set.status = 500;
            return { success: false, message: "Lỗi khi lấy danh sách người dùng" };
        }
    });
