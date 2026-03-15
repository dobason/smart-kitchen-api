import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { i18n } from "./plugins/i18n";
import { cookbookRoutes } from "./routes/cookbook.routes";
import { userRoutes } from "./routes/user.routes";
import { recipeRoutes } from "./routes/recipe.routes";
import { stepRoutes } from "./routes/step.routes";
import { tagRoutes } from "./routes/tag.routes";
import { ingredientRoutes } from "./routes/ingredient.routes";
import { cookbookRecipeRoutes } from "./routes/cookbook-recipe.routes";
import { recipeTagRoutes } from "./routes/recipe-tag.routes";
import { recipeIngredientRoutes } from "./routes/recipe-ingredient.routes";
const port = Number(process.env.PORT) || 3000;

const app = new Elysia()
  .use(swagger({
    documentation: {
      info: {
        title: "Smart Kitchen VN API",
        version: "1.0.0",
        description: "Hệ thống API cho ứng dụng Smart Kitchen VN"
      }
    }
  }))
  .use(i18n())
  .use(cookbookRoutes)
  .use(userRoutes)
  .use(recipeRoutes)
  .use(stepRoutes)
  .use(tagRoutes)
  .use(ingredientRoutes)
  .use(cookbookRecipeRoutes)
  .use(recipeTagRoutes)
  .use(recipeIngredientRoutes)
  .listen(port);

<<<<<<< HEAD
console.log(`🦊 SmartKitchen API đang chạy tại http://${app.server?.hostname}:${app.server?.port}`);
console.log(`📚 Trải nghiệm Test API tại http://${app.server?.hostname}:${app.server?.port}/swagger`);
=======
console.log(`🦊 SmartKitchen API is running at http://${app.server?.hostname}:${app.server?.port}`);
console.log(`📚 Experience Testing API at http://${app.server?.hostname}:${app.server?.port}/swagger`);
>>>>>>> 6238f58d4f1198f25894feacff642872035e9ad3
