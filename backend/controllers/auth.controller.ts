import { Request, Response } from "express";
import db from "../db";
import { users } from "../db/schema";

export const signUp = async (req: Request, res: Response) => {
  res.json({ message: "Sign up" });
};

export const createAccount = async (req: Request, res: Response) => {
  const result = await db.insert(users).values(req.body);
  res.send(result);
};

export const login = async (req: Request, res: Response) => {
  res.json({ message: "Log in" });
};

export const logout = async (req: Request, res: Response) => {
  res.json({ message: "Log out" });
};
