import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findUserById } from "../data/user";
import { User } from "../types/index";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No access token provided" });
    }
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      const user = await findUserById(decoded.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: "Token expired" });
      }
      throw error;
    }
  } catch (error) {
    console.error("Error in protectRoute", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const adminRoute = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied - Admin only" });
  }
  next();
};
