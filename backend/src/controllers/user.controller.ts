import { Request, Response } from "express";
import { findUserById } from "../services/user.service";

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await findUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
