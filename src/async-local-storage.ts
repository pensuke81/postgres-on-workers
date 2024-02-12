import { AsyncLocalStorage } from 'node:async_hooks'
import { createMiddleware } from 'hono/factory'
import { Context, Env } from 'hono'

type Callback<T, E extends Env> = (c: Context<E>) => T

const localStorage = new AsyncLocalStorage()

export const asyncLocalStorage = <T>() => {
  return {
    store: <E extends Env = Env>(callback: Callback<T, E>) =>
      createMiddleware(async (c, next) => {
        const obj = callback(c)
        return localStorage.run(obj, next)
      }),
    get: (key: keyof T) => {
      const store = localStorage.getStore() as T
      return store[key]
    }
  }
}
