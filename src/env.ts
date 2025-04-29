import { TypeBoxError } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { Static, t } from "elysia";

const EnvSchema = t.Object({
  LOG_LEVEL: t.UnionEnum(["fatal", "error", "warn", "info", "debug", "trace"]),
  NODE_ENV: t.UnionEnum(["development", "production"], {
    default: 'development'
  }),
  PORT: t.Number({ default: 5000 }),
  BETTER_AUTH_SECRET: t.String(),
  DATABASE_URL: t.String(),
})

export type env = Static<typeof EnvSchema>
let env: env

try {
  env = Value.Parse(EnvSchema, Bun.env)
} catch (err) {
  const error = err as TypeBoxError

  console.error('Invalid environment variables:')
  console.error(error)
  process.exit(1)
}

export default env
