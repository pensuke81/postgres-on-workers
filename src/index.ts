import { Hono } from 'hono'
import { db, createDatabaseInstance } from './db'
import { env } from 'hono/adapter'

type Env = {
  DATABASE_URL: string
}

const app = new Hono<{ Bindings: Env }>()

app
  .use('*', async (c, next) => {
    createDatabaseInstance(env(c).DATABASE_URL)
    await next()
  })
  .get('/', async (c) => {
    const result = await db.query.periodicTable.findMany()

    console.log(result)
    return c.json(result)
  })

export default app
