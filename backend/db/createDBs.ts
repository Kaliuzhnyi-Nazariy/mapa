import db from "./db";

const initTablesDB = async () => {
  await db.query(`
  BEGIN;
  CREATE DOMAIN IF NOT EXISTS not_empty AS varchar(128)
  CHECK (LENGTH(TRIM(VALUE)) > 0);
  CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    name not_empty NOT NULL,
    email not_empty NOT NULL UNIQUE,
    password varchar(156)
  );
  CREATE TABLE IF NOT EXISTS Map_points (
    id SERIAL PRIMARY KEY,
    name varchar(255),
    position JSON NOT NULL,
    owner_id int NOT NULL REFERENCES Users(id) ON DELETE CASCADE
  );
  COMMIT;
`);
};

export default initTablesDB;
