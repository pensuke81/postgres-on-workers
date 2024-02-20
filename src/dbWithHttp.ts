import { NeonHttpDatabase, drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from '../drizzle/schema'

export type DBHttp = NeonHttpDatabase<typeof schema>

export const createHttpDatabaseInstance = (databaseUrl: string): DBHttp => {
  const sql = neon(databaseUrl)
  return drizzle(sql, { schema })
}
