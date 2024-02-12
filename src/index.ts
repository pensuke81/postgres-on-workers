import { Hono } from 'hono'
import { env } from 'hono/adapter'
import { endTime, startTime, timing } from 'hono/timing'
import { query } from '../query'
import { asyncLocalStorage } from './async-local-storage'
import { createDatabaseInstance, DB } from './db'

type Env = {
  DATABASE_URL: string
}

const { store } = asyncLocalStorage<{ db: DB }>()

const app = new Hono<{ Bindings: Env }>()
  .use(timing())
  .use(
    store((c) => ({
      db: createDatabaseInstance(env<Env>(c).DATABASE_URL)
    }))
  )
  .get('/', async (c) => {
    startTime(c, 'query')
    const result = await query()
    endTime(c, 'query')

    return c.json(result)
  })

export default app
