import { Request, Response } from "express";
import { CreateUserInput, UserResponse } from "../types/user.type";
import {
  findUserByEmail,
  createUser,
  verifyUserEmail,
} from "../services/user.service";
import { User } from "../types/user.type";
import crypto from "crypto";
import { sendVerificationEmail } from "../services/email.service";
import { User as UserModel } from "../models/user.model";
import {
  createVerificationToken,
  deleteVerificationToken,
  findVerificationTokenByToken,
} from "../services/verificationToken.service";
export const signup = async (
  req: Request<any, any, CreateUserInput>,
  res: Response<{ message: string; user?: UserResponse }>
) => {
  const { name, email, password } = req.body;
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    res.status(409).json({ message: "User already exists" });
    return;
  }

  const newUser = await createUser({ name, email, password });
  try {
    const verificationToken = await createVerificationToken(newUser._id);
    await sendVerificationEmail(newUser.email, verificationToken.token);
  } catch (error) {
    console.error("Error sending verification email:", error);
    // Still return success since user was created, but log the email sending failure
    // Could also choose to delete the user and return error if email is critical
  }
  res.status(201).json({
    message: "User created successfully",
    user: {
      _id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      emailVerified: newUser.emailVerified,
      role: newUser.role,
    },
  });
};

export const verifyEmail = async (
  req: Request<{ token: string }>,
  res: Response<{ message: string }>
) => {
  try {
    const { token } = req.params;
    const verificationToken = await findVerificationTokenByToken(token);
    if (!verificationToken) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification token" });
    }

    await verifyUserEmail(verificationToken.userId.toString());

    await deleteVerificationToken(verificationToken.token);

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const resendVerificationEmail = async (
  req: Request<{ email: string }>,
  res: Response<{ message: string }>
) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.emailVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    await deleteVerificationToken(user._id.toString());
    const verificationToken = await createVerificationToken(
      user._id.toString()
    );
    await sendVerificationEmail(user.email, verificationToken.token);
    res.status(200).json({ message: "Verification email resent" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (
  req: Request,
  res: Response<{ message: string; user?: UserResponse }>
) => {
  const user = req.user as User;
  res.status(200).json({
    message: "Login successful",
    user: {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
    },
  });
};

export const status = async (
  req: Request,
  res: Response<{ message: string; user?: UserResponse }>
) => {
  const user = req.user as User;
  res.status(200).json({
    message: "User is authenticated",
    user: {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
    },
  });
};

export const logout = async (
  req: Request,
  res: Response<{ message: string }>
) => {
  req.logout((err) => {
    if (err) {
      res.status(500).json({ message: "Failed to logout" });
      return;
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  });
};
