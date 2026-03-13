import { Elysia, t } from "elysia";
import {
    createStep,
    deleteStep,
    getAllSteps,
    getStepById,
    updateStep,
} from "../services/step.services";

export const stepRoutes = new Elysia({ prefix: "v1/steps" })

    // 1. Lấy tất cả steps (GET)
    .get("/", async ({ query, set }) => {
        try {
            const steps = await getAllSteps({ recipeId: query.recipeId });
            return { success: true, data: steps };
        } catch (error) {
            console.error("Lỗi khi lấy danh sách steps:", error);
            set.status = 500;
            return { success: false, message: "Lỗi khi lấy danh sách bước nấu" };
        }
    }, {
        query: t.Object({
            recipeId: t.Optional(t.Numeric()),
        }),
    })

    // 2. Lấy chi tiết step (GET)
    .get("/:id", async ({ params: { id }, set }) => {
        try {
            const step = await getStepById(id);
            if (!step) {
                set.status = 404;
                return { success: false, message: "Không tìm thấy step" };
            }

            return { success: true, data: step };
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết step:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
    })

    // 3. Tạo mới step (POST)
    .post("/", async ({ body, set }) => {
        try {
            const data = body as {
                recipeId: number;
                stepNumber: number;
                instruction: string;
                tip?: string;
                time?: number;
            };

            if (!data.instruction.trim()) {
                set.status = 400;
                return { success: false, message: "Nội dung bước nấu không được để trống" };
            }

            const newStep = await createStep(data);
            set.status = 201;
            return { success: true, message: "Tạo thành công", data: newStep };
        } catch (error) {
            console.error("Lỗi khi tạo step:", error);
            set.status = 500;
            return { success: false, message: "Lỗi khi tạo step" };
        }
    }, {
        body: t.Object({
            recipeId: t.Number(),
            stepNumber: t.Number(),
            instruction: t.String(),
            tip: t.Optional(t.String()),
            time: t.Optional(t.Number()),
        }),
    })

    // 4. Cập nhật step (PUT)
    .put("/:id", async ({ params: { id }, body, set }) => {
        try {
            const data = body as {
                recipeId?: number;
                stepNumber?: number;
                instruction?: string;
                tip?: string;
                time?: number;
            };

            if (data.instruction !== undefined && !data.instruction.trim()) {
                set.status = 400;
                return { success: false, message: "Nội dung bước nấu không được để trống" };
            }

            const hasDataToUpdate = Object.values(data).some((value) => value !== undefined);
            if (!hasDataToUpdate) {
                set.status = 400;
                return { success: false, message: "No fields to update" };
            }

            const updatedStep = await updateStep(id, data);
            return { success: true, message: "Cập nhật thành công", data: updatedStep };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: "Không tìm thấy step để cập nhật" };
            }

            console.error("Lỗi khi cập nhật step:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
        body: t.Object({
            recipeId: t.Optional(t.Number()),
            stepNumber: t.Optional(t.Number()),
            instruction: t.Optional(t.String()),
            tip: t.Optional(t.String()),
            time: t.Optional(t.Number()),
        }),
    })

    // 5. Xóa step (DELETE)
    .delete("/:id", async ({ params: { id }, set }) => {
        try {
            await deleteStep(id);
            return { success: true, message: "Đã xóa step" };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: "Không tìm thấy step để xóa" };
            }

            console.error("Lỗi khi xóa step:", error);
            set.status = 500;
            return { success: false, message: "Lỗi hệ thống" };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
    });