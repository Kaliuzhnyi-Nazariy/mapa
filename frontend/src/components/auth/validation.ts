import { z } from "zod";

export const signinValidation = z.object({
  email: z.string().email("Please, enter valid email!"),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,16}$/,
      "Password must be 6-16 characters, include at least one uppercase letter and one number",
    )
    .min(6)
    .max(16),
});

export const signupValidation = z.object({
  name: z.string().min(2, "Name should be at least 2 characters!"),
  email: z.string().email("Please, enter valid email!"),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,16}$/,
      "Password must be 6-16 characters, include at least one uppercase letter and one number",
    )
    .min(6)
    .max(16),
});
