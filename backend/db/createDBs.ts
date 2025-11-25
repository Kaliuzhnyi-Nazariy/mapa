import db from "./db";

const initTablesDB = async () => {
  try {
    // Create the domain only if it doesn't exist
    await db.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'not_empty') THEN
          CREATE DOMAIN not_empty AS varchar(128)
            CHECK (LENGTH(TRIM(VALUE)) > 0);
        END IF;
      END$$;
    `);

    // Create Users table
    await db.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        name not_empty NOT NULL,
        email not_empty NOT NULL UNIQUE,
        password varchar(156)
      );
    `);

    // Create Map_points table
    await db.query(`
      CREATE TABLE IF NOT EXISTS Map_markers (
        id SERIAL PRIMARY KEY,
        name varchar(255),
        position JSON NOT NULL,
        owner_id int NOT NULL REFERENCES Users(id) ON DELETE CASCADE
      );
    `);

    console.log("Tables initialized successfully");
  } catch (err) {
    console.error("Error initializing tables:", err);
  }
};

export default initTablesDB;
