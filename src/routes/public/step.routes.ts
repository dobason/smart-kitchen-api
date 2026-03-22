import { Elysia, t } from "elysia";
import { t as translate } from "../../plugins/i18n";
import {
    getAllSteps,
    getStepById,
} from "../../services/step.services";

const locale = (req: Request) =>
    req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ?? "vi";

export const publicStepRoutes = new Elysia({ prefix: "v1/steps" })
    
    // Lấy tất cả steps (GET)
    .get("/", async ({ query, set, request }) => {
        try {
            const steps = await getAllSteps({ recipeId: query.recipeId });
            return { success: true, data: steps };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.step.fetch", locale(request)) };
        }
    }, {
        query: t.Object({
            recipeId: t.Optional(t.Numeric()),
        }),
<<<<<<< HEAD
=======
        detail: { tags: ["Public"], summary: "Get all steps in recipe" }
>>>>>>> bd454b0064926beb13d19aaaf7085d867990532c
    })

    // Lấy chi tiết step (GET)
    .get("/:id", async ({ params: { id }, set, request }) => {
        try {
            const step = await getStepById(id);
            if (!step) {
                set.status = 404;
                return { success: false, message: translate("errors.step.not_found", locale(request)) };
            }
            return { success: true, data: step };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
<<<<<<< HEAD
=======
        detail: { tags: ["Public"], summary: "Get step by id" }
>>>>>>> bd454b0064926beb13d19aaaf7085d867990532c
    });