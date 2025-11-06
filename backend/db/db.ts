import { Pool } from "pg";
import "dotenv/config";

// const db = new Pool({
//   host: process.env.PG_HOST,
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   database: process.env.PG_DATABASE,
//   port: Number(process.env.PG_PORT),
// });

const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  ssl: { rejectUnauthorized: false },
});

export default db;
