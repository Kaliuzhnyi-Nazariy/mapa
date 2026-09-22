import { CookieOptions } from "express";

// export const tokenSettings: CookieOptions = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//   path: "/",
//   maxAge: 86400000,
// };

export const tokenSettings: CookieOptions = {
  httpOnly: true,
  secure: true, // Wymuś true (Render i tak działa na HTTPS)
  sameSite: "none", // Wymuś "none" dla cross-domain
  path: "/",
  maxAge: 86400000,
};
