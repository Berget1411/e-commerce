import { Request, Response } from "express";
import { SignUpValidationSchema, LoginValidationSchema } from "../schemas";
import { findUserByEmail, createUser } from "../data/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import redis from "../lib/redis";

dotenv.config();

const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId: string, refreshToken: string) => {
  await redis.set(`refreshToken:${userId}`, refreshToken, {
    ex: 60 * 60 * 24 * 7, // 7 days
  });
};

const setCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // prevent client side access
    secure: process.env.NODE_ENV !== "development", // only send the cookie over HTTPS in production
    maxAge: 15 * 60 * 1000, // 15 minutes
    sameSite: "strict", // prevent CSRF attacks
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // prevent client side access
    secure: process.env.NODE_ENV !== "development", // only send the cookie over HTTPS in production
    maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
    sameSite: "strict", // prevent CSRF attacks
  });
};

export const signUp = async (req: Request, res: Response) => {
  const validatedFields = SignUpValidationSchema.safeParse(req.body);

  if (!validatedFields.success) {
    return res.status(400).json({ message: "Invalid fields" });
  }

  const { name, email, password } = validatedFields.data;
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await createUser({ name, email, password });

  // authenticate user
  const { accessToken, refreshToken } = await generateTokens(user.id);
  await storeRefreshToken(user.id, refreshToken);

  setCookies(res, accessToken, refreshToken);

  if (user instanceof Error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: user.message });
  }

  res.status(201).json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    message: "User created successfully",
  });
};

export const login = async (req: Request, res: Response) => {};

export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET
      );
      await redis.del(`refreshToken:${decoded.userId}`);
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
