import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { testConnection } from "./lib/prisma";
import {
  authRoutes,
  userRoutes,
  recipeRoutes,
  ingredientRoutes,
  tagRoutes,
  cookbookRoutes,
} from "./routes";

const app = new Elysia()
  // CORS
  .use(
    cors({
      origin: process.env.CORS_ORIGIN || "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  )
  // Swagger Documentation
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: {
          title: "Recipe API",
          version: "1.0.0",
          description: "Recipe Management API built with ElysiaJS and Prisma",
        },
        tags: [
          { name: "Auth", description: "Authentication endpoints" },
          { name: "Users", description: "User management" },
          { name: "Recipes", description: "Recipe CRUD operations" },
          { name: "Recipe Steps", description: "Manage recipe steps" },
          { name: "Recipe Ingredients", description: "Manage recipe ingredients" },
          { name: "Recipe Tags", description: "Manage recipe tags" },
          { name: "Ingredients", description: "Ingredient management" },
          { name: "Tags", description: "Tag management" },
          { name: "Cookbooks", description: "Cookbook management" },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "Clerk session token",
            },
          },
        },
      },
    })
  )
  // Health check
  .get("/health", () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "recipe-api",
  }))
  // API Routes
  .group("/api/v1", (app) =>
    app
      .use(authRoutes)
      .use(userRoutes)
      .use(recipeRoutes)
      .use(ingredientRoutes)
      .use(tagRoutes)
      .use(cookbookRoutes)
  )
  // Global error handler
  .onError(({ code, error, set }) => {
    console.error(`Error [${code}]:`, error);

    if (code === "VALIDATION") {
      set.status = 400;
      return {
        success: false,
        error: "Validation error",
        details: error.message,
      };
    }

    if (code === "NOT_FOUND") {
      set.status = 404;
      return {
        success: false,
        error: "Not found",
      };
    }

    set.status = 500;
    return {
      success: false,
      error: "Internal server error",
    };
  })
  .listen(process.env.PORT || 3000);

// Startup
async function bootstrap() {
  await testConnection();

  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🍳 Recipe API - ElysiaJS + Prisma                       ║
║                                                           ║
║   Server:  http://${app.server?.hostname}:${app.server?.port}                       ║
║   Docs:    http://${app.server?.hostname}:${app.server?.port}/docs                  ║
║   Health:  http://${app.server?.hostname}:${app.server?.port}/health                ║
║   Studio:  Run 'bun run db:studio'                        ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
}

bootstrap();

export type App = typeof app;
