import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { i18n } from "./plugins/i18n";
import { apiRoutes } from "./routes";
const port = Number(process.env.PORT) || 3000;
const hostname = process.env.APP_HOST || 'localhost';

const app = new Elysia()
  .use(swagger({
    documentation: {
      info: {
        title: "Smart Kitchen VN API",
        version: "1.0.0",
        description: "Test API for Smart Kitchen VN. \n\nClerk Publishable Key for testing: `pk_test_cmVuZXdlZC1oZXJtaXQtMzAuY2xlcmsuYWNjb3VudHMuZGV2JA`"
      }
    }
  }))
  .use(i18n())
  .use(apiRoutes)
  .listen({ port, hostname });

console.log(`🦊 SmartKitchen API is running at http://${app.server?.hostname}:${app.server?.port}`);
console.log(`📚 Experience Testing API at http://${app.server?.hostname}:${app.server?.port}/swagger`);
