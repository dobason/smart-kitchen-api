import { Elysia, t } from "elysia";
import { t as translate } from "../../plugins/i18n";
import {
    getAllCookbooks,
    getCookbookById,
    createCookbook,
    updateCookbook,
    deleteCookbook,
} from "../../services/cookbook.services";

const locale = (req: Request) =>
    req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ?? "vi";

export const cookbookRoutes = new Elysia({ prefix: "v1/cookbooks" })

    // 1. Lấy tất cả (GET)
    .get("/", async ({ query, set, request }) => {
        try {
            const cookbooks = await getAllCookbooks({ userId: query.userId });
            return { success: true, data: cookbooks };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.cookbook.fetch", locale(request)) };
        }
    }, {
        query: t.Object({
            userId: t.Optional(t.Numeric()),
        })
    })

    // 2. Lấy chi tiết (GET)
    .get("/:id", async ({ params: { id }, set, request }) => {
        try {
            const cookbook = await getCookbookById(id);
            if (!cookbook) {
                set.status = 404;
                return { success: false, message: translate("errors.cookbook.not_found", locale(request)) };
            }
            return { success: true, data: cookbook };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({ id: t.Numeric() })
    })

    // 3. Tạo mới (POST)
    .post("/", async ({ body, set, request }) => {
        try {
            const data = body as { name: string; userId: number };

            if (!data.name?.trim()) {
                set.status = 400;
                return { success: false, message: translate("errors.cookbook.name_required", locale(request)) };
            }

            const newCookbook = await createCookbook({ name: data.name, userId: data.userId });
            set.status = 201;
            return { success: true, message: translate("success.created", locale(request)), data: newCookbook };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.cookbook.create_failed", locale(request)) };
        }
    }, {
        body: t.Object({
            name: t.String(),
            userId: t.Number()
        })
    })

    // 4. Cập nhật (PUT)
    .put("/:id", async ({ params: { id }, body, set, request }) => {
        try {
            const data = body as { name?: string };

            if (!data.name) {
                set.status = 400;
                return { success: false, message: translate("errors.no_fields_to_update", locale(request)) };
            }

            const updatedCookbook = await updateCookbook(id, data);
            return { success: true, message: translate("success.updated", locale(request)), data: updatedCookbook };
        } catch (error: any) {
            if (error?.code === 'P2025') {
                set.status = 404;
                return { success: false, message: translate("errors.cookbook.not_found_update", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
        body: t.Object({
            name: t.Optional(t.String()),
        })
    })

    // 5. Xóa (DELETE)
    .delete("/:id", async ({ params: { id }, set, request }) => {
        try {
            await deleteCookbook(id);
            return { success: true, message: translate("success.deleted", locale(request)) };
        } catch (error: any) {
            if (error?.code === 'P2025') {
                set.status = 404;
                return { success: false, message: translate("errors.cookbook.not_found_delete", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({ id: t.Numeric() })
    });
