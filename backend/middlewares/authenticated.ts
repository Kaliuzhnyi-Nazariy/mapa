// import { NextFunction, Request, Response } from "express";
// import { errorHandler } from "../helpers";
// import db from "../db/db";
// import { decode, JwtPayload } from "jsonwebtoken";
// import cookie from "cookie";

// export interface UserRequest extends Request {
//   user: {
//     id: string;
//     name: string;
//     email: string;
//   };
//   token: string;
// }

// export const isAuthenticated = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   let tokenCookie = req.cookies?.token;

//   if (!tokenCookie && req.headers["set-cookie"]) {
//     const setCookieHeader = req.headers["set-cookie"];
//     const cookiesArray = Array.isArray(setCookieHeader)
//       ? setCookieHeader
//       : [setCookieHeader];

//     for (const c of cookiesArray) {
//       const parsed = cookie.parse(c);
//       if (parsed.token) {
//         tokenCookie = parsed.token;
//         break;
//       }
//     }
//   }

//   if (!tokenCookie) {
//     return next(errorHandler(401, "No token!"));
//   }

//   try {
//     const { id } = decode(tokenCookie) as { id: string | JwtPayload };

//     const { rows } = await db.query(
//       "SELECT id, name, email FROM Users WHERE id =$1",
//       [id],
//     );

//     if (rows.length === 0) {
//       return next(errorHandler(401));
//     }

//     (req as unknown as UserRequest).user = rows[0];
//     (req as unknown as UserRequest).token = tokenCookie;

//     next();
//   } catch (error) {
//     return next(errorHandler(401, "Invalid token!"));
//   }
// };

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
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(errorHandler(401, "No token!"));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(errorHandler(401, "Token missing!"));
  }

  try {
    const { id } = decode(token) as { id: string | JwtPayload };

    const { rows } = await db.query(
      "SELECT id, name, email FROM Users WHERE id =$1",
      [id],
    );

    if (rows.length === 0) {
      return next(errorHandler(401));
    }

    (req as unknown as UserRequest).user = rows[0];
    (req as unknown as UserRequest).token = token;

    next();
  } catch (error) {
    return next(errorHandler(401, "Invalid token!"));
  }
};
