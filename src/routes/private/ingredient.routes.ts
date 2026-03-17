import { Elysia, t } from "elysia";
import { t as translate } from "../../plugins/i18n";
import { HttpStatus } from "../../types";
import { clerkPlugin } from "elysia-clerk";
import {
    createIngredient,
    deleteIngredient,
    updateIngredient,
} from "../../services/ingredient.services"; 

const locale = (req: Request) =>
    req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ?? "vi";

export const privateIngredientRoutes = new Elysia({ prefix: "v1/ingredients" })
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
    // Tạo mới ingredient (POST)
    .post("/", async ({ body, set, request }) => {
        try {
            const data = body as { name: string; icon?: string };

            if (!data.name.trim()) {
                set.status = 400;
                return { success: false, message: translate("errors.ingredient.name_required", locale(request)) };
            }

            const newIngredient = await createIngredient(data);
            set.status = 201;
            return { success: true, message: translate("success.created", locale(request)), data: newIngredient };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.ingredient.create_failed", locale(request)) };
        }
    }, {
        body: t.Object({
            name: t.String(),
            icon: t.Optional(t.String()),
        }),
        detail: { tags: ["Private"], summary: "Create new ingredient" }
    })

    // Cập nhật ingredient (PUT)
    .put("/:id", async ({ params: { id }, body, set, request }) => {
        try {
            const data = body as { name?: string; icon?: string };

            if (data.name !== undefined && !data.name.trim()) {
                set.status = 400;
                return { success: false, message: translate("errors.ingredient.name_required", locale(request)) };
            }

            const hasDataToUpdate = Object.values(data).some((value) => value !== undefined);
            if (!hasDataToUpdate) {
                set.status = 400;
                return { success: false, message: translate("errors.no_fields_to_update", locale(request)) };
            }

            const updatedIngredient = await updateIngredient(id, data);
            return { success: true, message: translate("success.updated", locale(request)), data: updatedIngredient };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.ingredient.not_found_update", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
        body: t.Object({
            name: t.Optional(t.String()),
            icon: t.Optional(t.String()),
        }),
        detail: { tags: ["Private"], summary: "Update ingredient" }
    })

    // Xóa ingredient (DELETE)
    .delete("/:id", async ({ params: { id }, set, request }) => {
        try {
            await deleteIngredient(id);
            return { success: true, message: translate("success.deleted", locale(request)) };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.ingredient.not_found_delete", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({ id: t.Numeric() }),
        detail: { tags: ["Private"], summary: "Delete ingredient" }
    });