import { Request, Response } from "express";

export const signUp = async (req: Request, res: Response) => {
  res.json({ message: "Sign up" });
};

export const login = async (req: Request, res: Response) => {
  res.json({ message: "Log in" });
};

export const logout = async (req: Request, res: Response) => {
  res.json({ message: "Log out" });
};
