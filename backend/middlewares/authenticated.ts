import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../helpers";
import db from "../db/db";
import { decode, JwtPayload } from "jsonwebtoken";

export interface UserRequest extends Request {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log("headers: ", req.headers["set-cookie"]);
  // console.log("cookies: ", req.cookies);
  // console.log("cookies token: ", req.cookies.token);

  const tokenCookie = req.cookies.token;
  if (!tokenCookie) {
    return next(errorHandler(401, "No token!"));
  }

  const { id } = decode(tokenCookie) as { id: string | JwtPayload };

  // console.log({ id });

  const { rows } = await db.query(
    "SELECT id, name, email FROM Users WHERE id =$1",
    [id]
  );

  if (rows.length == 0) {
    next(errorHandler(401));
  }

  (req as unknown as UserRequest).user = rows[0];

  next();
};
