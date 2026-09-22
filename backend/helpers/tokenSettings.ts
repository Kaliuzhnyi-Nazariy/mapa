import { CookieOptions } from "express";

export const tokenSettings: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 86400000,
};
