import { EnvVarNotFoundError } from './errors/EnvVarNotFoundError'

export type EnvManager = {
  getDB_CONNECTION_STRING: () => string
}

const getDB_CONNECTION_STRING: EnvManager['getDB_CONNECTION_STRING'] = () => {
  const connectionString = process.env.DB_CONNECTION_STRING
  if (!connectionString) {
    throw new EnvVarNotFoundError('DB_CONNECTION_STRING')
  }
  return connectionString
}

export const EnvManager: EnvManager = {
  getDB_CONNECTION_STRING: getDB_CONNECTION_STRING,
}
