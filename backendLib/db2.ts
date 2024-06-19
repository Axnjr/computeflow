import { Client, Pool } from "pg";

let db;

if (!db) {
  db = new Pool({
    connectionString:process.env.DATABASE_URL2
  });
}

export default db as Pool;