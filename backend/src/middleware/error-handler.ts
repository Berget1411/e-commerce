import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { MongoError } from "mongodb";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      errors: err.errors,
    });
  }

  if (err instanceof MongoError) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Duplicate key error",
      });
    }
  }

  return res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
};
