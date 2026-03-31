import { NextFunction, Request, Response } from "express";
import { ctrlWrapper, errorHandler, tokenSettings } from "../helpers";
import { signIn, signUp } from "../service/auth";

export interface SignUp {
  name: string;
  email: string;
  password: string;
}

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return next(errorHandler(400, "All fields are required"));

  const { data, token } = await signUp({ name, email, password });

  res.cookie("token", token, tokenSettings);

  res.status(201).json({ name: data });
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  const { data, token } = await signIn({ email, password });

  res.cookie("token", token, tokenSettings);

  res.status(200).json({ name: data });
};

const signout = async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("token", tokenSettings);
  res.status(204).json();
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
};
