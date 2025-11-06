import db from "./db";

const initTablesDB = async () => {
  await db.query(`
  CREATE DOMAIN IF NOT EXISTS not_empty AS varchar(128) CHECK (LENGTH(TRIM(VALUE)) > 0);

  CREATE TABLE IF NOT EXISTS Users (
  id SERIAL NOT NULL,
  name not_empty NOT NULL,
  email not_empty NOT NULL UNIQUE,
  password varchar(156),
  PRIMARY KEY (id)
  );

  CREATE TABLE IF NOT EXISTS Map_points (
  id SERIAL NOT NULL PRIMARY KEY,
  name varchar(255),
  position JSON NOT NULL,
  owner_id int NOT NULL,
  FOREIGN KEY (owner_id) REFERENCES Users(id) ON DELETE CASCADE
  );

`);
};

export default initTablesDB;
