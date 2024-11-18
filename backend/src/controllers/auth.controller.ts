import { Request, Response } from "express";
import { CreateUserInput, UserResponse } from "../types/user.type";
import { findUserByEmail, createUser } from "../services/user.service";
import { User } from "../types/user.type";
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

export const login = async (
  req: Request,
  res: Response<{ message: string; user?: UserResponse }>
) => {
  const user = req.user as User;
  res.status(200).json({
    message: "Login successful",
    user: {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
    },
  });
};

export const status = async (
  req: Request,
  res: Response<{ message: string; user?: UserResponse }>
) => {
  const user = req.user as User;
  res.status(200).json({
    message: "User is authenticated",
    user: {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
    },
  });
};
