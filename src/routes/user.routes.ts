import { Elysia, t } from "elysia";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
} from "../services/user.services";

export const userRoutes = new Elysia({ prefix: "v1/users" })

    // 1. Lấy tất cả users (GET)
    .get("/", async ({ set }) => {
        try {
            const users = await getAllUsers();
            return { success: true, data: users };
        } catch (error) {
            console.error("Lỗi khi lấy danh sách users:", error);
            set.status = 500;
            return { success: false, message: "Lỗi khi lấy danh sách người dùng" };
        }
    })

    // 2. Lấy chi tiết user (GET)
    .get("/:id", async ({ params: { id }, set }) => {
        try {
            const user = await getUserById(id);
            if (!user) {
                set.status = 404;
                return { success: false, message: "Không tìm thấy người dùng" };
            }

            return { success: true, data: user };
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết user:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
    })

    // 3. Tạo mới user (POST)
    .post("/", async ({ body, set }) => {
        try {
            const data = body as {
                email: string;
                username: string;
                avartarUrl?: string;
            };

            if (!data.email.trim() || !data.username.trim()) {
                set.status = 400;
                return { success: false, message: "email và username là bắt buộc" };
            }

            const newUser = await createUser(data);
            set.status = 201;
            return { success: true, message: "Tạo thành công", data: newUser };
        } catch (error) {
            console.error("Lỗi khi tạo user:", error);
            set.status = 500;
            return { success: false, message: "Lỗi khi tạo người dùng" };
        }
    }, {
        body: t.Object({
            email: t.String(),
            username: t.String(),
            avartarUrl: t.Optional(t.String()),
        }),
    })

    // 4. Cập nhật user (PUT)
    .put("/:id", async ({ params: { id }, body, set }) => {
        try {
            const data = body as {
                email?: string;
                username?: string;
                avartarUrl?: string;
            };

            if (data.email !== undefined && !data.email.trim()) {
                set.status = 400;
                return { success: false, message: "Email không được để trống" };
            }

            if (data.username !== undefined && !data.username.trim()) {
                set.status = 400;
                return { success: false, message: "Username không được để trống" };
            }

            const hasDataToUpdate = Object.values(data).some((value) => value !== undefined);
            if (!hasDataToUpdate) {
                set.status = 400;
                return { success: false, message: "No fields to update" };
            }

            const updatedUser = await updateUser(id, data);
            return { success: true, message: "Cập nhật thành công", data: updatedUser };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: "Không tìm thấy người dùng để cập nhật" };
            }

            console.error("Lỗi khi cập nhật user:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
        body: t.Object({
            email: t.Optional(t.String()),
            username: t.Optional(t.String()),
            avartarUrl: t.Optional(t.String()),
        }),
    })

    // 5. Xóa user (DELETE)
    .delete("/:id", async ({ params: { id }, set }) => {
        try {
            await deleteUser(id);
            return { success: true, message: "Đã xóa người dùng" };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: "Không tìm thấy người dùng để xóa" };
            }

            console.error("Lỗi khi xóa user:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
    });
