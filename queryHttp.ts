import { LocalStorage } from './src'
import { asyncLocalStorage } from './src/async-local-storage'

const { get } = asyncLocalStorage<LocalStorage>()

export const queryHttp = async () => {
  const db = get('dbHttp')

  const result = await db.query.periodicTable.findMany({ limit: 10 })

  return result
}
