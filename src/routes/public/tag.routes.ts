import { Elysia, t } from "elysia";
import { t as translate } from "../../plugins/i18n";
import {
    getAllTags,
    getTagById,
} from "../../services/tag.services";

const locale = (req: Request) =>
    req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ?? "vi";

export const publicTagRoutes = new Elysia({ prefix: "v1/tags" })
    // Lấy tất cả tags (GET)
    .get("/", async ({ set, request }) => {
        try {
            const tags = await getAllTags();
            return { success: true, data: tags };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.tag.fetch", locale(request)) };
        }
    })

    // Lấy chi tiết tag (GET)
    .get("/:id", async ({ params: { id }, set, request }) => {
        try {
            const tag = await getTagById(id);
            if (!tag) {
                set.status = 404;
                return { success: false, message: translate("errors.tag.not_found", locale(request)) };
            }
            return { success: true, data: tag };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
    });