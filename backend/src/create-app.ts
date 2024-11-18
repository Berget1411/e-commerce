import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import { initializeRedisStore } from "./lib/redis";

import { connectDB } from "./lib/mongo";
import { indexRouter } from "./routes";
import "./strategies/local-strategy";

dotenv.config();

export const createApp = async () => {
  const app = express();
  const redisStore = await initializeRedisStore();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      store: redisStore,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    })
  );

  await connectDB();
  app.use(passport.initialize());
  app.use(passport.session());
  app.use("/api", indexRouter);

  return app;
};
