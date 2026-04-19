import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'

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

const privateRoutes = new Elysia()
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
    .use(cors())
    .use(publicRoutes)
    .use(privateRoutes);
