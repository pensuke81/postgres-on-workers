## Dev

```sh
npm install
npm run dev
```

```sh
npm run deploy
```

## Bench

```sh
k6 run bench.mjs -e DB=docker --vus 10 -i 100
```

--vus: number of virtual users
-i: script total iteration limit (among all VUs)

## Data

- <https://neon.tech/docs/import/import-sample-data>
- <https://github.com/neondatabase/postgres-sample-dbs>

```sh
wget https://raw.githubusercontent.com/neondatabase/postgres-sample-dbs/main/periodic_table.sql
```
