import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../middlewares/authenticated";
import { ctrlWrapper } from "../helpers";
import db from "../db/db";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as unknown as UserRequest).user;
  // console.log(user);
  res.status(200).json(user);
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = (req as unknown as UserRequest).user;

  const deletedUser = await db.query("DELETE FROM Users WHERE id =$1", [id]);

  res.status(200).json(deletedUser);
};

export default {
  getUser: ctrlWrapper(getUser),
  deleteUser: ctrlWrapper(deleteUser),
};
