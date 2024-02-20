import { Hono } from "hono";
import { env } from "hono/adapter";
import { asyncLocalStorage } from "./async-local-storage";
import { DB, createDatabaseInstance } from "./db";
import { DBHttp, createHttpDatabaseInstance } from "./dbWithHttp";

type Env = {
  DATABASE_URL_NEON: string;
  DATABASE_URL_DOCKER: string;
  DATABASE_URL_CLOUDSQL: string;
};

export type LocalStorage = {
  dbNeon: DB;
  dbHttpNeon: DBHttp;
  dbDocker: DB;
  dbCloudSQL: DB;
};

const { store, get } = asyncLocalStorage<LocalStorage>();

const app = new Hono<{ Bindings: Env }>()
  .use(
    store((c) => ({
      dbNeon: createDatabaseInstance(env<Env>(c).DATABASE_URL_NEON),
      dbHttpNeon: createHttpDatabaseInstance(env<Env>(c).DATABASE_URL_NEON),
      dbCloudSQL: createDatabaseInstance(env<Env>(c).DATABASE_URL_CLOUDSQL),
      dbDocker: createDatabaseInstance(env<Env>(c).DATABASE_URL_DOCKER),
    }))
  )
  .get("/neon", async (c) => {
    const start = performance.now();
    const result = await get("dbNeon").query.periodicTable.findMany({
      limit: 100,
    });
    const end = performance.now();
    const time = end - start;

    return c.text(`${time}ms`);
  })
  .get("/http-neon", async (c) => {
    const start = performance.now();
    const result = await get("dbHttpNeon").query.periodicTable.findMany({
      limit: 100,
    });
    const end = performance.now();
    const time = end - start;

    return c.text(`${time}ms: http`);
  })
  .get("/docker", async (c) => {
    const start = performance.now();
    const result = await get("dbDocker").query.periodicTable.findMany({
      limit: 100,
    });
    const end = performance.now();
    const time = end - start;

    return c.text(`${time}ms`);
  })
  .get("/cloudsql", async (c) => {
    const start = performance.now();
    const result = await get("dbCloudSQL").query.periodicTable.findMany({
      limit: 100,
    });
    const end = performance.now();
    const time = end - start;

    return c.text(`${time}ms`);
  });

export default app;
