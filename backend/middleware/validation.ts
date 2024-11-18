import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validateRequest = <T>(schema: ZodSchema<T>) => {
  return (req: Request<{}, {}, T>, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ errors: result.error.issues });
      return;
    }

    req.body = result.data;
    next();
  };
};
