import { Pool } from "pg";
import "dotenv/config";

const isProduction = process.env.NODE_ENV === "production";

const prodConnectionString = process.env.PROD_DB;
const testConnectionString = process.env.TEST_DB;

if (isProduction && !prodConnectionString) {
  throw new Error("no link to db");
}

const connectionString = isProduction
  ? prodConnectionString
  : testConnectionString;

const db = new Pool({
  connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : undefined,
});

db.on("error", (err) => {
  console.error("Unexpected error on idle database client:", err.message);
});

export default db;
