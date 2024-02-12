import { asyncLocalStorage } from './src/async-local-storage'
import { DB } from './src/db'

const { get } = asyncLocalStorage<{ db: DB }>()

export const query = async () => {
  const db = get('db')

  const result = await db.query.periodicTable.findMany({ limit: 10 })

  return result
}
