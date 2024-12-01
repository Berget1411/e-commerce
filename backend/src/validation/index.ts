import { z } from "zod";
const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()\-_+={}[\]|\\;:"<>,./?]).{8,}$/
);

export const SignupValidationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().regex(passwordRegex, {
    message:
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
  }),
});

export const LoginValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const ProductValidationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description is too short" }),
  category: z.enum(["clothing", "shoes", "accessories", "sports"]),
  target_audience: z.enum(["unisex", "men", "women", "kids"]),
  brand: z.string().min(2, { message: "Brand must be at least 2 characters" }),
  price: z.number().positive({ message: "Price must be positive" }),
  quantity: z.number().int().positive({ message: "Quantity must be positive" }),
  discount: z.number().min(0).max(100).optional(),
  featured: z.boolean(),
  image: z.string().url({ message: "Invalid image URL" }),
});

export const ReviewValidationSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z
    .string()
    .min(5, { message: "Comment must be at least 5 characters" }),
});
