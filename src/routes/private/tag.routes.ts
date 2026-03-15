import { Elysia, t } from "elysia";
import { t as translate } from "../../plugins/i18n";
import {
    createTag,
    deleteTag,
    updateTag,
} from "../../services/tag.services";

const locale = (req: Request) =>
    req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ?? "vi";

export const privateTagRoutes = new Elysia({ prefix: "v1/tags" })
    
    // Tạo mới tag (POST)
    .post("/", async ({ body, set, request }) => {
        try {
            const data = body as { name: string; category?: string };

            if (!data.name.trim()) {
                set.status = 400;
                return { success: false, message: translate("errors.tag.name_required", locale(request)) };
            }

            const newTag = await createTag(data);
            set.status = 201;
            return { success: true, message: translate("success.created", locale(request)), data: newTag };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.tag.create_failed", locale(request)) };
        }
    }, {
        body: t.Object({
            name: t.String(), category: t.Optional(t.String()),
        }),
    })

    // Cập nhật tag (PUT)
    .put("/:id", async ({ params: { id }, body, set, request }) => {
        try {
            const data = body as { name?: string; category?: string };

            if (data.name !== undefined && !data.name.trim()) {
                set.status = 400;
                return { success: false, message: translate("errors.tag.name_required", locale(request)) };
            }

            const hasDataToUpdate = Object.values(data).some((value) => value !== undefined);
            if (!hasDataToUpdate) {
                set.status = 400;
                return { success: false, message: translate("errors.no_fields_to_update", locale(request)) };
            }

            const updatedTag = await updateTag(id, data);
            return { success: true, message: translate("success.updated", locale(request)), data: updatedTag };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.tag.not_found_update", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
        body: t.Object({
            name: t.Optional(t.String()), category: t.Optional(t.String()),
        }),
    })

    // Xóa tag (DELETE)
    .delete("/:id", async ({ params: { id }, set, request }) => {
        try {
            await deleteTag(id);
            return { success: true, message: translate("success.deleted", locale(request)) };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.tag.not_found_delete", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
    });