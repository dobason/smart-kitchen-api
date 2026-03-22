import { Elysia, t } from "elysia";
import { t as translate } from "../../plugins/i18n";
<<<<<<< HEAD
=======
import { HttpStatus } from "../../types";
import { clerkPlugin } from "elysia-clerk";
>>>>>>> bd454b0064926beb13d19aaaf7085d867990532c
import {
    createStep,
    deleteStep,
    updateStep,
} from "../../services/step.services";

const locale = (req: Request) =>
    req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ?? "vi";

export const privateStepRoutes = new Elysia({ prefix: "v1/steps" })
<<<<<<< HEAD
    
=======
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
>>>>>>> bd454b0064926beb13d19aaaf7085d867990532c
    // Tạo mới step (POST)
    .post("/", async ({ body, set, request }) => {
        try {
            const data = body as {
                recipeId: number; stepNumber: number; instruction: string;
                tip?: string; time?: number;
            };

            if (!data.instruction.trim()) {
                set.status = 400;
                return { success: false, message: translate("errors.step.instruction_required", locale(request)) };
            }

            const newStep = await createStep(data);
            set.status = 201;
            return { success: true, message: translate("success.created", locale(request)), data: newStep };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.step.create_failed", locale(request)) };
        }
    }, {
        body: t.Object({
            recipeId: t.Number(), stepNumber: t.Number(), instruction: t.String(),
            tip: t.Optional(t.String()), time: t.Optional(t.Number()),
        }),
        detail: { tags: ["Private"], summary: "Create new step" }
    })

    // Cập nhật step (PUT)
    .put("/:id", async ({ params: { id }, body, set, request }) => {
        try {
            const data = body as {
                recipeId?: number; stepNumber?: number; instruction?: string;
                tip?: string; time?: number;
            };

            if (data.instruction !== undefined && !data.instruction.trim()) {
                set.status = 400;
                return { success: false, message: translate("errors.step.instruction_required", locale(request)) };
            }

            const hasDataToUpdate = Object.values(data).some((value) => value !== undefined);
            if (!hasDataToUpdate) {
                set.status = 400;
                return { success: false, message: translate("errors.no_fields_to_update", locale(request)) };
            }

            const updatedStep = await updateStep(id, data);
            return { success: true, message: translate("success.updated", locale(request)), data: updatedStep };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.step.not_found_update", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
        body: t.Object({
            recipeId: t.Optional(t.Number()), stepNumber: t.Optional(t.Number()),
            instruction: t.Optional(t.String()), tip: t.Optional(t.String()),
            time: t.Optional(t.Number()),
        }),
        detail: { tags: ["Private"], summary: "Update step" }
    })

    // Xóa step (DELETE)
    .delete("/:id", async ({ params: { id }, set, request }) => {
        try {
            await deleteStep(id);
            return { success: true, message: translate("success.deleted", locale(request)) };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.step.not_found_delete", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
<<<<<<< HEAD
=======
        detail: { tags: ["Private"], summary: "Delete step" }
>>>>>>> bd454b0064926beb13d19aaaf7085d867990532c
    });