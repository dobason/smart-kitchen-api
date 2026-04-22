import { Elysia, t } from "elysia";
import { t as translate } from "../../plugins/i18n";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
    upsertUser,
    syncClerkUser,
} from "../../services/user.services";

const locale = (req: Request) =>
    req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ?? "vi";

export const publicUserRoutes = new Elysia({
    prefix: "v1/users",
    detail: {
        tags: ["Users"]
    }
})

    // Lấy tất cả users (GET)
    .get("/", async ({ set, request }) => {
        try {
            const users = await getAllUsers();
            return { success: true, data: users };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.user.fetch", locale(request)) };
        }
    }, {
        detail: { summary: "Get all users" }
    })

    // Tạo mới user (POST)
    .post("/", async ({ body, set, request }) => {
        try {
            const data = body as {
                userId?: string;
                email: string;
                username: string;
                avartarUrl?: string;
            };

            if (!data.email.trim() || !data.username.trim()) {
                set.status = 400;
                return { success: false, message: translate("errors.user.required_fields", locale(request)) };
            }

            const newUser = await createUser(data);
            set.status = 201;
            return { success: true, message: translate("success.created", locale(request)), data: newUser };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.user.create_failed", locale(request)) };
        }
    }, {
        body: t.Object({
            userId: t.Optional(t.String()),
            email: t.String(),
            username: t.String(),
            avartarUrl: t.Optional(t.String()),
        }),
        detail: { summary: "Create new user" }
    })

    // Upsert user: tạo mới nếu chưa có, bỏ qua nếu đã có (POST)
    .post("/upsert", async ({ body, set, request }) => {
        try {
            const data = body as {
                userId?: string;
                email: string;
                username: string;
                avartarUrl?: string;
            };

            if (!data.email.trim() || !data.username.trim()) {
                set.status = 400;
                return { success: false, message: translate("errors.user.required_fields", locale(request)) };
            }

            const user = await upsertUser(data);
            return { success: true, data: user };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.user.create_failed", locale(request)) };
        }
    }, {
        body: t.Object({
            userId: t.Optional(t.String()),
            email: t.String(),
            username: t.String(),
            avartarUrl: t.Optional(t.String()),
        }),
        detail: { summary: "Upsert user (create if not exists)" }
    })

    // Lấy chi tiết user (GET)
    .get("/:userId", async ({ params: { userId }, set, request }) => {
        try {
            const user = await getUserById(userId);
            if (!user) {
                set.status = 404;
                return { success: false, message: translate("errors.user.not_found", locale(request)) };
            }
            return { success: true, data: user };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({ userId: t.String() }),
        detail: { summary: "Get user by id" }
    })

    // Cập nhật user (PUT)
    .put("/:userId", async ({ params: { userId }, body, set, request }) => {
        try {
            const data = body as {
                email?: string;
                username?: string;
                avartarUrl?: string;
            };

            if (data.email !== undefined && !data.email.trim()) {
                set.status = 400;
                return { success: false, message: translate("errors.user.email_required", locale(request)) };
            }

            if (data.username !== undefined && !data.username.trim()) {
                set.status = 400;
                return { success: false, message: translate("errors.user.username_required", locale(request)) };
            }

            const hasDataToUpdate = Object.values(data).some((value) => value !== undefined);
            if (!hasDataToUpdate) {
                set.status = 400;
                return { success: false, message: translate("errors.no_fields_to_update", locale(request)) };
            }

            const updatedUser = await updateUser(userId, data);
            return { success: true, message: translate("success.updated", locale(request)), data: updatedUser };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.user.not_found_update", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({ userId: t.String() }),
        body: t.Object({
            email: t.Optional(t.String()),
            username: t.Optional(t.String()),
            avartarUrl: t.Optional(t.String()),
        }),
        detail: { summary: "Update user" }
    })

    // Xóa user (DELETE)
    .delete("/:userId", async ({ params: { userId }, set, request }) => {
        try {
            await deleteUser(userId);
            return { success: true, message: translate("success.deleted", locale(request)) };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.user.not_found_delete", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({ userId: t.String() }),
        detail: { summary: "Delete user" }
    })

    // Đồng bộ user từ Clerk (POST)
    .post("/sync-clerk", async ({ body, set, request }) => {
        try {
            const { clerkUserId } = body as { clerkUserId: string };
            if (!clerkUserId) {
                set.status = 400;
                return { success: false, message: "clerkUserId is required" };
            }

            const user = await syncClerkUser(clerkUserId);
            return { success: true, data: user };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.user.create_failed", locale(request)) };
        }
    }, {
        body: t.Object({
            clerkUserId: t.String(),
        }),
        detail: { summary: "Sync user from Clerk" }
    });