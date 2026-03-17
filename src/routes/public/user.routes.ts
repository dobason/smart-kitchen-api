import { Elysia, t } from "elysia";
import { t as translate } from "../../plugins/i18n";
import {
    getAllUsers,
    getUserById,
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
        detail: { tags: ["Public"], summary: "Get all users" }
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
        params: t.Object({ userId: t.Numeric() }),
        detail: { tags: ["Public"], summary: "Get a user by ID" }
    })