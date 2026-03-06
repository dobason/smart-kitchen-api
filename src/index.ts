import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cookbookRoutes } from "./routes/cookbook/cookbook.routes";

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
  .use(cookbookRoutes)
  .listen(3000);

console.log(`🦊 SmartKitchen API đang chạy tại http://${app.server?.hostname}:${app.server?.port}`);
console.log(`📚 Trải nghiệm Test API tại http://${app.server?.hostname}:${app.server?.port}/swagger`);
