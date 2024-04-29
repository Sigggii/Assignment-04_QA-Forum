import type { Config } from 'drizzle-kit'

export default {
    schema: './src/db/schema.ts',
    out: './drizzle',

    driver: 'pg',
    dbCredentials: {
        connectionString: 'postgres://admin:admin@localhost:5432/qa-forum',
    },
} satisfies Config
