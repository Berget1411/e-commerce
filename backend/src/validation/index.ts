import { z } from "zod";
const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()\-_+={}[\]|\\;:"<>,./?]).{8,}$/
);

export const SignupValidationSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().regex(passwordRegex, {
    message:
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
  }),
});

export const LoginValidationSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
