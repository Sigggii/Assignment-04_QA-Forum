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
import auth from '@fastify/auth'
import { JWTPayload, Role } from './shared/types'
import { authenticationHandler, authorizationHandler } from './routes/authHandler'
import { userRoutes } from './routes/userRoutes'
import { errorHandler } from './routes/errorHandling/errorHandler'

// Add custom fields to Fastify types
declare module 'fastify' {
    interface FastifyRequest {
        authUser: JWTPayload | undefined
    }

    interface FastifyInstance {
        authenticate: (req: FastifyRequest, resp: FastifyReply, done: (err?: Error) => void) => void
        authorize: (req: FastifyRequest, resp: FastifyReply, done: (err?: Error) => void) => void
    }

    interface FastifyContextConfig {
        rolesAllowed: Role[] | 'ALL' | undefined
    }
}

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

// Create Fastify instance
export const fastify = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()

//set Custom Error Handler
fastify.setErrorHandler(errorHandler)

// Register plugins
fastify.register(cookie, {
    secret: getConfig().COOKIE_SECRET,
})
fastify.register(fastifyCors, {
    origin: getConfig().CORS_ALLOWED_ORIGINS,
    credentials: true,
})

fastify.register(auth)
fastify.decorate('authenticate', authenticationHandler)
fastify.decorate('authorize', authorizationHandler)

//Run authenticate hook before every request
fastify.addHook('onRequest', fastify.authenticate)

fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)

export type BaseFastifyInstance = typeof fastify

// Register routes
const routes = async (fastify: BaseFastifyInstance) => {
    fastify.register(authRoutes, { prefix: 'auth' })
    fastify.register(userRoutes, { prefix: 'users' })
    fastify.register(questionRoutes, { prefix: 'questions' })
    fastify.get('/', (res, rep) => {
        rep.status(200).send()
    })
}

// Set Base route
fastify.register(routes, { prefix: '/api' })
const start = async () => {
    try {
        await fastify.listen({ port: getConfig().PORT })
    } catch (err) {
        console.log(err)
    }
}
start().then(() => console.log('Server started'))
