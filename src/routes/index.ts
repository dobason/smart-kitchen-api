import { Elysia } from "elysia";

// --- 1. IMPORT CÁC FILE PUBLIC (KHÔNG CẦN ĐĂNG NHẬP) ---
import { publicIngredientRoutes } from "./public/ingredient.routes";
import { publicRecipeIngredientRoutes } from "./public/recipe-ingredient.routes";
import { publicRecipeTagRoutes } from "./public/recipe-tag.routes";
import { publicRecipeRoutes } from "./public/recipe.routes";
import { publicStepRoutes } from "./public/step.routes";
import { publicTagRoutes } from "./public/tag.routes";
<<<<<<< HEAD
=======
import { publicUserRoutes } from "./public/user.routes";
>>>>>>> bd454b0064926beb13d19aaaf7085d867990532c

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
<<<<<<< HEAD
=======
import { authRoutes } from "./private/auth.routes";
>>>>>>> bd454b0064926beb13d19aaaf7085d867990532c

// --- 3. GOM NHÓM PUBLIC ---
const publicRoutes = new Elysia()
    .use(publicIngredientRoutes)
    .use(publicRecipeIngredientRoutes)
    .use(publicRecipeTagRoutes)
    .use(publicRecipeRoutes)
    .use(publicStepRoutes)
<<<<<<< HEAD
    .use(publicTagRoutes);

// --- 4. GOM NHÓM PRIVATE ---
// (Sau này bạn chỉ cần gắn Middleware Clerk vào đúng cục privateRoutes này là khóa được toàn bộ hệ thống)
const privateRoutes = new Elysia()
=======
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
>>>>>>> bd454b0064926beb13d19aaaf7085d867990532c
    .use(cookbookRoutes)
    .use(cookbookRecipeRoutes)
    .use(userRoutes)
    .use(privateIngredientRoutes)
    .use(privateRecipeIngredientRoutes)
    .use(privateRecipeTagRoutes)
    .use(privateRecipeRoutes)
    .use(privateStepRoutes)
<<<<<<< HEAD
    .use(privateTagRoutes);

// --- 5. XUẤT RA API TỔNG HỢP ---
export const apiRoutes = new Elysia({ prefix: "/" })
=======
    .use(privateTagRoutes)
    .use(authRoutes);

// --- 5. XUẤT RA API TỔNG HỢP ---
export const apiRoutes = new Elysia({ prefix: "" })
>>>>>>> bd454b0064926beb13d19aaaf7085d867990532c
    .use(publicRoutes)
    .use(privateRoutes);