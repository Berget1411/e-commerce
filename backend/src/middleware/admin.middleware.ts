import { NextFunction, Request, Response } from "express";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role === "admin") {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}
