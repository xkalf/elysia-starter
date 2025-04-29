import env from '@/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig(
  {
    out: './drizzle',
    schema: './src/lib/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
      url: env.DATABASE_URL
    }
  }
)
