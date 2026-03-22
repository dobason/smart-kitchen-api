import { Elysia, t } from "elysia";
import { t as translate } from "../../plugins/i18n";
<<<<<<< HEAD
=======
import { HttpStatus } from "../../types";
import { clerkPlugin } from "elysia-clerk";
>>>>>>> bd454b0064926beb13d19aaaf7085d867990532c
import {
    createRecipeTag,
    deleteRecipeTag,
    updateRecipeTag,
} from "../../services/recipe-tag.services";

const locale = (req: Request) =>
    req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ?? "vi";

export const privateRecipeTagRoutes = new Elysia({ prefix: "v1/recipe-tags" })
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
    // Tạo mới recipe tag (POST)
    .post("/", async ({ body, set, request }) => {
        try {
            const data = body as { recipeId: number; tagId: number };
            const newRecipeTag = await createRecipeTag(data);
            set.status = 201;
            return { success: true, message: translate("success.created", locale(request)), data: newRecipeTag };
        } catch (error) {
            set.status = 500;
            return { success: false, message: translate("errors.recipe_tag.create_failed", locale(request)) };
        }
    }, {
        body: t.Object({
            recipeId: t.Number(),
            tagId: t.Number(),
        }),
        detail: { tags: ["Private"], summary: "Create new tag in recipe" }
    })

    // Cập nhật recipe tag (PUT)
    .put("/:recipeId/:tagId", async ({ params: { recipeId, tagId }, body, set, request }) => {
        try {
            const data = body as { recipeId?: number; tagId?: number };
            const hasDataToUpdate = Object.values(data).some((value) => value !== undefined);

            if (!hasDataToUpdate) {
                set.status = 400;
                return { success: false, message: translate("errors.no_fields_to_update", locale(request)) };
            }

            const updatedRecipeTag = await updateRecipeTag(recipeId, tagId, data);
            return { success: true, message: translate("success.updated", locale(request)), data: updatedRecipeTag };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.recipe_tag.not_found_update", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({
            recipeId: t.Numeric(),
            tagId: t.Numeric(),
        }),
        body: t.Object({
            recipeId: t.Optional(t.Number()),
            tagId: t.Optional(t.Number()),
        }),
        detail: { tags: ["Private"], summary: "Update tag in recipe" }
    })

    // Xóa recipe tag (DELETE)
    .delete("/:recipeId/:tagId", async ({ params: { recipeId, tagId }, set, request }) => {
        try {
            await deleteRecipeTag(recipeId, tagId);
            return { success: true, message: translate("success.deleted", locale(request)) };
        } catch (error: any) {
            if (error?.code === "P2025") {
                set.status = 404;
                return { success: false, message: translate("errors.recipe_tag.not_found_delete", locale(request)) };
            }
            set.status = 500;
            return { success: false, message: translate("errors.system", locale(request)) };
        }
    }, {
        params: t.Object({
            recipeId: t.Numeric(),
            tagId: t.Numeric(),
        }),
<<<<<<< HEAD
=======
        detail: { tags: ["Private"], summary: "Delete tag in recipe" }
>>>>>>> bd454b0064926beb13d19aaaf7085d867990532c
    });