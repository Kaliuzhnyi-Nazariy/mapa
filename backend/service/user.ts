import db from "../db/db";
import { errorHandler } from "../helpers";
import bcrypt from "bcryptjs";

const getUser = async ({ id }: { id: string }) => {
  const columns = ["id", "email", "name"];

  const queryText = `
    SELECT ${columns.join(", ")} 
    FROM users 
    WHERE id = $1
  `;

  const { rows } = await db.query(queryText, [id]);

  return rows[0] || null;
};

const updateUserData = async ({
  id,
  email,
  name,
}: {
  id: string;
  email: string;
  name: string;
}) => {
  const user = await db.query(`SELECT 1 FROM users WHERE id = $1`, [id]);

  if (user.rowCount === 0) {
    return errorHandler(404, "User is not found");
  }

  const result = await db.query(
    `UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING name, email;`,
    [name, email, id],
  );

  return result.rows[0];
};

const deleteUser = async ({ id }: { id: string }) => {
  await db.query("BEGIN");

  await db.query("DELETE FROM Map_markers WHERE owner_id = $1;", [id]);

  await db.query("DELETE FROM users WHERE id = $1;", [id]);

  await db.query("COMMIT");

  return;
};

const updateUserPassword = async ({
  password,
  id,
}: {
  password: string;
  id: string;
}) => {
  const user = await db.query("SELECT 1 FROM users WHERE id = $1;", [id]);

  if (user.rowCount === 0) {
    return errorHandler(404, "User is not found");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.query("UPDATE users SET password = $1 WHERE id = $2", [
    hashedPassword,
    id,
  ]);

  return;
};

export default { updateUserData, getUser, deleteUser, updateUserPassword };
