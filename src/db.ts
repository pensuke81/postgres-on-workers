import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../drizzle/schema'

export type DB = PostgresJsDatabase<typeof schema>

export const createDatabaseInstance = (databaseUrl: string): DB => {
  const queryClient = postgres(databaseUrl)
  return drizzle(queryClient, { schema })
}
