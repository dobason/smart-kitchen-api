import { Elysia } from "elysia";

import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { testConnection } from "./lib/prisma";
import {
  userPublicRoutes,
  recipePublicRoutes,
  ingredientPublicRoutes,
  tagPublicRoutes,
} from "./routes/public";
import {
  authRoutes,
  cookbookRoutes,
  userPrivateRoutes,
  recipePrivateRoutes,
  ingredientPrivateRoutes,
  tagPrivateRoutes,
} from "./routes/private";

const API_VERSION = "v1" as const;

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
          title: "Smart Kitchen API",
          version: "1.0.0",
          description: "Smart Kitchen API built with ElysiaJS + Prisma + PostgreSQL",
        },
        externalDocs: {
          description: "Login with Clerk to get your {{ YOUR_SECRET_TOKEN }}",
          url: "/login-with-clerk"
        },
        tags: [
          // Public endpoints
          { name: 'Public', description: 'Public endpoints' },
          // Private endpoints (requires Bearer token)
          { name: 'Private', description: 'Private endpoints (requires YOUR_SECRET_TOKEN)' },
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
  // Playground — Clerk-authenticated API explorer
  .get("/login-with-clerk", async () => {
    const pk = (process.env.CLERK_PUBLISHABLE_KEY ?? "").trim();
    // Derive the Frontend API URL from the publishable key
    // pk format: pk_test_<base64(fapi_host + "$")>
    const fapiHost = Buffer.from(pk.split("_")[2] ?? "", "base64")
      .toString("utf8")
      .replace(/\$$/, "");
    let html = await Bun.file(`${import.meta.dir}/../public/playground.html`).text();
    html = html.replaceAll("__CLERK_PUBLISHABLE_KEY__", pk);
    html = html.replaceAll("__CLERK_FAPI__", fapiHost);
    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }, { detail: { hide: true } })
  // Health check
  .get("/", () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "smart-kitchen-api",
  }), {
    detail: { hide: true },
  })
  .get("/health", () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "smart-kitchen-api",
  }), {
    detail: { hide: true },
  })
  // Public routes
  .group(`/${API_VERSION}`, (app) =>
    app
      .use(userPublicRoutes)
      .use(recipePublicRoutes)
      .use(ingredientPublicRoutes)
      .use(tagPublicRoutes)
  )
  // Private routes (require auth)
  .group(`/${API_VERSION}/private`, (app) =>
    app
      .use(authRoutes)
      .use(cookbookRoutes)
      .use(userPrivateRoutes)
      .use(recipePrivateRoutes)
      .use(ingredientPrivateRoutes)
      .use(tagPrivateRoutes)
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
║   Server:     http://${app.server?.hostname}:${app.server?.port}                    ║
║   Docs:       http://${app.server?.hostname}:${app.server?.port}/docs               ║
║   Playground: http://${app.server?.hostname}:${app.server?.port}/login-with-clerk         ║
║   Health:     http://${app.server?.hostname}:${app.server?.port}/health             ║
║   Studio:     Run 'bun run db:studio'                     ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
}

bootstrap();

export type App = typeof app;
