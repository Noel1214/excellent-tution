import { z } from "zod";

export const usernameSchema = z
  .string({ required_error: "invalid password" })
  .min(1, "username is required")
  .regex(/^[a-zA-Z]+$/, "Username can only contain letters")
  .min(3, "username must contain minimum 3 letters")
  .max(12, "username must not have more than 12 letters");

export const emailSchema = z
  .string({ required_error: "email is required" })
  .regex(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Invalid email address"
  );

export const passwordSchema = z
  .string({ required_error: "invalid password" })
  .min(4, "password must contain minimum 4 letters");

export const signUpSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
