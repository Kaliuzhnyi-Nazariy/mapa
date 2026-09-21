import z from "zod";

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(16, "Password must be at most 16 characters")
  .regex(
    /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,16}$/,
    "Password must include at least one uppercase letter and one number",
  );

export const updatePasswordValidation = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const updateUserData = z.object({
  name: z.string().min(2, "Name should be at least 2 characters!"),
  email: z.string().email("Please, enter valid email!"),
});
