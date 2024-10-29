import { Request, Response } from "express";
import { SignUpValidationSchema, LoginValidationSchema } from "../schemas";
import { findUserByEmail, createUser } from "../data/user";

export const signUp = async (req: Request, res: Response) => {
  const validatedFields = SignUpValidationSchema.safeParse(req.body);

  if (!validatedFields.success) {
    return res.status(400).json({ message: "Invalid fields" });
  }

  const { name, email, password } = validatedFields.data;
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await createUser({ name, email, password });

  if (user instanceof Error) {
    return res.status(500).json({ message: "Internal server error" });
  }

  res.status(201).json({ message: "User created successfully" });
};

export const login = async (req: Request, res: Response) => {};
