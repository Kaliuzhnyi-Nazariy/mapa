import { Pool } from "pg";
import "dotenv/config";

let db: Pool;

if (process.env.NODE_ENV !== "production") {
  db = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: Number(process.env.PG_PORT),
  });
} else {
  db = new Pool({
    connectionString: process.env.INTERNAL_DB_LINK,
    ssl: { rejectUnauthorized: false },
  });
}

export default db;
