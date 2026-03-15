import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { i18n } from "./plugins/i18n";
import { apiRoutes } from "./routes";
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
  .use(apiRoutes)
  .listen(port);

console.log(`🦊 SmartKitchen API is running at http://${app.server?.hostname}:${app.server?.port}`);
console.log(`📚 Experience Testing API at http://${app.server?.hostname}:${app.server?.port}/swagger`);
