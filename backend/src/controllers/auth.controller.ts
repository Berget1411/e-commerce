import { Request, Response } from "express";
import { CreateUserInput, UserResponse } from "../types/user.type";
import {
  findUserByEmail,
  createUser,
  verifyUserEmail,
} from "../services/user.service";
import { User } from "../types/user.type";
import { sendVerificationEmail } from "../services/email.service";
import { User as UserModel } from "../models/user.model";
import {
  createVerificationToken,
  deleteVerificationToken,
  findVerificationTokenByToken,
} from "../services/verificationToken.service";
import {
  createResetToken,
  findResetTokenByToken,
  deleteResetToken,
} from "../services/resetToken.service";
import { sendResetPasswordEmail } from "../services/email.service";
import { hashPassword } from "../utils/helpers";

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
    const verificationToken = await createVerificationToken(
      newUser._id.toString()
    );
    await sendVerificationEmail(newUser.email, verificationToken.token);
  } catch (error) {
    console.error("Error sending verification email:", error);
    // Still return success since user was created, but log the email sending failure
    // Could also choose to delete the user and return error if email is critical
  }
  res.status(201).json({
    message: "User created successfully",
    user: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      emailVerified: newUser.emailVerified,
      role: newUser.role,
      cartItems: [],
      likedProducts: [],
    },
  });
};

export const verifyEmail = async (req: Request, res: Response) => {
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
    return res.status(500).json({ message: "Server error" });
  }
};

export const resendVerificationEmail = async (
  req: Request<{}, {}, { email: string }>,
  res: Response<{ message: string }>
): Promise<Response | void> => {
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
    return res.status(500).json({ message: "Server error" });
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
      _id: user._id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
      cartItems: user.cartItems,
      likedProducts: user.likedProducts,
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
      _id: user._id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
      cartItems: user.cartItems,
      likedProducts: user.likedProducts,
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

export const forgotPassword = async (
  req: Request<any, any, { email: string }>,
  res: Response<{ message: string }>
): Promise<Response | void> => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(200).json({
        message: "If an account exists, you will receive a reset email",
      });
    }

    const resetToken = await createResetToken(user._id.toString());
    await sendResetPasswordEmail(user.email, resetToken.token);

    res.status(200).json({
      message: "If an account exists, you will receive a reset email",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (
  req: Request<any, any, { token: string; password: string }>,
  res: Response<{ message: string }>
): Promise<Response | void> => {
  try {
    const { token, password } = req.body;
    const resetToken = await findResetTokenByToken(token);

    if (!resetToken) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    const user = await UserModel.findById(resetToken.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = await hashPassword(password);
    await user.save();
    await deleteResetToken(token);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
