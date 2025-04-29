import { Elysia } from "elysia";
import pinoLogger from "./middlewares/pino-logger";
import env from "./env";
import router from "./routes";
import { OpenAPI } from "./lib/auth";
import swagger from "@elysiajs/swagger";
import cors from "@elysiajs/cors";

const app = new Elysia()
  .use(pinoLogger)
  .use(cors({
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }))
  .use(swagger({
    documentation: {
      components: await OpenAPI.components,
      paths: await OpenAPI.getPaths()
    },
    path: '/doc'
  }))
  .onError(({ code, error, path, request }) => {
    if (code === 'NOT_FOUND') {
      return {
        code,
        message: `${path} ${request.method} NOT FOUND`
      }
    }
    return {
      code,
      message: 'message' in error ? error.message : error,
      error: error
    }
  })
  .use(router)
  .listen(env.PORT);

export type App = typeof app

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
