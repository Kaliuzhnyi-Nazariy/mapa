import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../middlewares/authenticated";
import { ctrlWrapper } from "../helpers";
import db from "../db/db";
import service from "../service/user";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = (req as unknown as UserRequest).user;

  // const includePassword = req.query.isPasswordInclude === "true";

  const user = await service.getUser({
    id,
    // options: { includePassword }
  });
  // console.log(user);
  res.status(200).json(user);
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = (req as unknown as UserRequest).user;

  const { email, name } = req.body;

  // const result = await service.updateUserData({ id, email, name, password });
  const result = await service.updateUserData({ id, email, name });

  res.status(200).json(result);
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = (req as unknown as UserRequest).user;

  await service.deleteUser({ id });

  res.status(204).end();
};

const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = (req as unknown as UserRequest).user;

  const { password } = req.body;

  // const deletedUser = await db.query("DELETE FROM Users WHERE id =$1", [id]);
  const result = await service.updateUserPassword({ id, password });

  res.status(200).json(result);
};

export default {
  getUser: ctrlWrapper(getUser),
  deleteUser: ctrlWrapper(deleteUser),
  updateUser: ctrlWrapper(updateUser),
  updatePassword: ctrlWrapper(updatePassword),
};
