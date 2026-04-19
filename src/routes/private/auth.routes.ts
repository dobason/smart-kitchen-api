import { Elysia } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { t as translate } from "../../plugins/i18n";
import { HttpStatus } from "../../types";

const locale = (req: Request) =>
    req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ?? "vi";

export const authRoutes = new Elysia({
    prefix: "v1/auth",
    detail: {
        tags: ["Auth"],
        security: [{ bearerAuth: [] }]
    }
})
    .use(clerkPlugin())
    .onBeforeHandle(({ auth, set, request }) => {
        const { userId } = auth();
        if (!userId) {
            set.status = HttpStatus.UNAUTHORIZED;
            return {
                success: false,
                message: translate("errors.unauthorized", locale(request))
            };
        }
    })
    .resolve(({ auth }) => {
        const { userId } = auth();
        return { userId: userId as string };
    })
    .get("/me", async ({ userId, set, request, auth }) => {
        try {
            // userId is now available from .resolve()
            return {
                success: true,
                message: translate("success.authenticated", locale(request)),
                data: {
                    userId,
                    auth: auth() // still accessible via auth() if needed for other metadata
                }
            };
        } catch (error) {
            set.status = HttpStatus.INTERNAL_SERVER_ERROR;
            return {
                success: false,
                message: translate("errors.system", locale(request))
            };
        }
    }, {
        detail: {
            tags: ["Private"],
            summary: "Get current authenticated user information",
            security: [{ bearerAuth: [] }]
        }
    });
