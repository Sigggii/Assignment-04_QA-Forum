import Fastify from 'fastify'
import dotenv from 'dotenv'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { checkEnv, getConfig } from './system/EnvManager'
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import { questionRoutes } from './routes/questionRoutes'
import fastifyCors from '@fastify/cors'
import * as schema from './db/schema'
import cookie from '@fastify/cookie'
import { authRoutes } from './routes/authRoutes'

// In production use environment variables instead of .env file. Make sure to set the var NODE_ENV = 'production'.
if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}
// Check if all required environment variables are set
checkEnv()

//setup drizzle
const connectionString = getConfig().DB_CONNECTION_STRING
const sql = postgres(connectionString, { max: 1 })
const dbMigration = drizzle(sql)

//migrate db schema
migrate(dbMigration, { migrationsFolder: 'drizzle' })
    .then(() => console.log('Migration completed'))
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })

// initialize db-client for database access
const queryClient = postgres(connectionString)
export const db = drizzle(queryClient, { schema })

export const fastify = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()
fastify.register(cookie, {
    secret: getConfig().COOKIE_SECRET,
})
fastify.register(fastifyCors, {
    origin: getConfig().CORS_ALLOWED_ORIGINS,
    credentials: true,
})
export type BaseFastifyInstance = typeof fastify

fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)

const routes = (fastify: BaseFastifyInstance, opt: any, done: any) => {
    fastify.register(authRoutes, { prefix: 'auth' })
    fastify.register(questionRoutes, { prefix: 'questions' })
    fastify.get('/', (res, rep) => {
        rep.status(200).send()
    })
    done()
}

fastify.register(routes, { prefix: '/api' })
const start = async () => {
    try {
        await fastify.listen({ port: getConfig().PORT })
    } catch (err) {
        console.log(err)
    }
}
start()
