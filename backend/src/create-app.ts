import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/mongo";
import { indexRouter } from "./routes";

export const createApp = async () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  await connectDB();
  app.use("/", indexRouter);

  return app;
};
