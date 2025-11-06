import { NextFunction, Request, Response } from "express";
import { CustomError } from "../helpers/errorHandler";

const errorRoute = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
};

export default errorRoute;
