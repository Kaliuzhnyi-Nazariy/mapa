import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../helpers";

export interface UserRequest extends Request {
  // user: {
  //     name: string,
  //     user: string
  // }
  token: string;
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.headers["set-cookie"]);
  console.log(req.cookies);

  const tokenCookie = req.cookies.token;
  if (!tokenCookie) {
    next(errorHandler(401, "No token!"));
  }

  next();
};
