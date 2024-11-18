import { Request, Response } from "express";
import { CreateUserInput, UserResponse } from "../types/user.type";
import { findUserByEmail, createUser } from "../services/user.service";

export const signup = async (
  req: Request<any, any, CreateUserInput>,
  res: Response<{ message: string; user?: UserResponse }>
) => {
  const { name, email, password } = req.body;
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    res.status(409).json({ message: "User already exists" });
    return;
  }

  const newUser = await createUser({ name, email, password });
  res.status(201).json({
    message: "User created successfully",
    user: {
      _id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      emailVerified: newUser.emailVerified,
      role: newUser.role,
    },
  });
};
