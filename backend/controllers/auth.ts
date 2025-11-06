import { NextFunction, Request, Response } from "express";
import { ctrlWrapper, errorHandler } from "../helpers";
import db from "../db/db";
import bcrypt from "bcryptjs";

export interface SignUp {
  name: string;
  email: string;
  password: string;
}

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    next(errorHandler(400, "All fields should be filled!"));

  const hashedPassword = await bcrypt.hash(password, 10);

  const { rows } = await db.query(
    "INSERT INTO Users (name, email, password) VALUES ($1, $2, $3) RETURNING *;",
    [name, email, hashedPassword]
  );

  res.status(201).json(rows[0]);
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password)
    next(errorHandler(400, "All fields should be filled!"));

  const { rows } = await db.query("SELECT * FROM Users where email=$1", [
    email,
  ]);

  if (rows.length == 0) {
    return next(errorHandler(400, "Email or password is not matching!"));
  }

  const isPasswordMatch = await bcrypt.compare(password, rows[0].password);

  if (!isPasswordMatch) {
    return next(errorHandler(400, "Email or password is not matching!"));
  }

  res.cookie("token", "token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 86400,
  });

  res.status(200).json({ name: rows[0].name, email: rows[0].email });
};

const signout = async (req: Request, res: Response, next: NextFunction) => {
  res.status(204).json();
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
};
