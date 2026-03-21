import { Elysia } from "elysia";

// --- 1. IMPORT CÁC FILE PUBLIC (KHÔNG CẦN ĐĂNG NHẬP) ---
import { publicIngredientRoutes } from "./public/ingredient.routes";
import { publicRecipeIngredientRoutes } from "./public/recipe-ingredient.routes";
import { publicRecipeTagRoutes } from "./public/recipe-tag.routes";
import { publicRecipeRoutes } from "./public/recipe.routes";
import { publicStepRoutes } from "./public/step.routes";
import { publicTagRoutes } from "./public/tag.routes";
import { publicUserRoutes } from "./public/user.routes";

// --- 2. IMPORT CÁC FILE PRIVATE (CẦN ĐĂNG NHẬP) ---
import { cookbookRoutes } from "./private/cookbook.routes";
import { cookbookRecipeRoutes } from "./private/cookbook-recipe.routes";
import { userRoutes } from "./private/user.routes";
import { privateIngredientRoutes } from "./private/ingredient.routes";
import { privateRecipeIngredientRoutes } from "./private/recipe-ingredient.routes";
import { privateRecipeTagRoutes } from "./private/recipe-tag.routes";
import { privateRecipeRoutes } from "./private/recipe.routes";
import { privateStepRoutes } from "./private/step.routes";
import { privateTagRoutes } from "./private/tag.routes";
import { authRoutes } from "./private/auth.routes";

// --- 3. GOM NHÓM PUBLIC ---
const publicRoutes = new Elysia()
    .use(publicIngredientRoutes)
    .use(publicRecipeIngredientRoutes)
    .use(publicRecipeTagRoutes)
    .use(publicRecipeRoutes)
    .use(publicStepRoutes)
    .use(publicTagRoutes)
    .use(publicUserRoutes);

// --- 4. GOM NHÓM PRIVATE ---
import { clerkPlugin } from "elysia-clerk";

const privateRoutes = new Elysia()
    .use(clerkPlugin())
    .derive(({ store }) => {
        // elysia-clerk places auth on the store object
        return {
            auth: (store as any).auth
        };
    })
    .onBeforeHandle(({ auth, set }) => {
        if (!auth?.userId) {
            set.status = 401;
            return {
                message: "Unauthorized - Authentication required",
            };
        }
    })
    .use(cookbookRoutes)
    .use(cookbookRecipeRoutes)
    .use(userRoutes)
    .use(privateIngredientRoutes)
    .use(privateRecipeIngredientRoutes)
    .use(privateRecipeTagRoutes)
    .use(privateRecipeRoutes)
    .use(privateStepRoutes)
    .use(privateTagRoutes)
    .use(authRoutes);

// --- 5. XUẤT RA API TỔNG HỢP ---
export const apiRoutes = new Elysia({ prefix: "" })
    .use(publicRoutes)
    .use(privateRoutes);