import db from "../db/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../helpers";

const signUp = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  let data;

  try {
    data = await db.query(
      "INSERT INTO Users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email;",
      [name, email, hashedPassword],
    );
  } catch (error: unknown) {
    const errDetail = (error as { detail: string }).detail;
    if (errDetail.split(" ").includes("already")) {
      throw errorHandler(409, "User with that credential is already exist!");
    } else {
      throw errorHandler(500, errDetail);
    }
  }

  if (!data) throw errorHandler(500, "Sth went wrong!");

  const { rows } = data;

  const payload = {
    id: rows[0].id,
  };

  const token = jwt.sign(payload, process.env.SECRET_JWT!);

  return { data: rows[0].name, token };
};

const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { rows } = await db.query("SELECT * FROM Users where email=$1", [
    email,
  ]);

  if (rows.length == 0) {
    throw errorHandler(400, "Wrong credentials");
  }

  const isPasswordMatch = await bcrypt.compare(password, rows[0].password);

  if (!isPasswordMatch) {
    throw errorHandler(400, "Wrong credentials");
  }

  const payload = {
    id: rows[0].id,
  };

  const token = jwt.sign(payload, process.env.SECRET_JWT!);

  return { data: rows[0].name, token };
};

export { signIn, signUp };
