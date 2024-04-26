import Fastify from 'fastify'
import dotenv from 'dotenv'

import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { EnvManager } from './system/EnvManager'

// In production use environment variables instead of .env file. Make sure to set the var NODE_ENV = 'production'.
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

//setup drizzle
const connectionString = EnvManager.getDB_CONNECTION_STRING()
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
export const db = drizzle(queryClient)

const fastify = Fastify()

const start = async () => {
  try {
    await fastify.listen({ port: 8080 })
  } catch (err) {
    console.log(err)
  }
}

start()
