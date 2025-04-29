import pino from "pino";
import env from "@/env";
import PinoPretty from "pino-pretty";
import { wrap } from "@bogeychan/elysia-logger";

const logger = pino({
  level: env.LOG_LEVEL,
}, env.NODE_ENV === 'development' ? PinoPretty() : undefined)

const pinoLogger = wrap(logger, {
  useLevel: env.LOG_LEVEL
})

export default pinoLogger
