// import { NextFunction, Request, Response } from "express";
// import { ctrlWrapper, errorHandler, tokenSettings } from "../helpers";
// import { signIn, signUp } from "../service/auth";

// export interface SignUp {
//   name: string;
//   email: string;
//   password: string;
// }

// const signup = async (req: Request, res: Response, next: NextFunction) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password)
//     return next(errorHandler(400, "All fields are required"));

//   const { data, token } = await signUp({ name, email, password });

//   res.cookie("token", token, tokenSettings);

//   res.status(201).json({ name: data });
// };

// const signin = async (req: Request, res: Response, next: NextFunction) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return next(errorHandler(400, "All fields are required"));
//   }

//   const { data, token } = await signIn({ email, password });

//   res.cookie("token", token, tokenSettings);

//   res.status(200).json({ name: data });
// };

// // const signout = async (req: Request, res: Response, next: NextFunction) => {
// //   res.clearCookie("token", tokenSettings);
// //   res.status(204).end();
// // };

// const signout = async (req: Request, res: Response, next: NextFunction) => {
//   // 1. Destructure to remove expiration settings from cookie deletion
//   const { maxAge, expires, ...clearSettings } = tokenSettings;

//   // 2. Clear the cookie using only structural configurations (path, domain, secure, httpOnly, sameSite)
//   res.clearCookie("token", clearSettings);

//   // 3. Use .send() or .end() for a 204 response since it must have NO body payload
//   res.status(204).send();
// };

// export default {
//   signup: ctrlWrapper(signup),
//   signin: ctrlWrapper(signin),
//   signout: ctrlWrapper(signout),
// };

import { NextFunction, Request, Response } from "express";
import { ctrlWrapper, errorHandler } from "../helpers";
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

  res.status(201).json({
    name: data,
    token,
  });
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  const { data, token } = await signIn({ email, password });

  res.status(200).json({
    name: data,
    token,
  });
};

const signout = async (req: Request, res: Response, next: NextFunction) => {
  res.status(204).send();
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
};
