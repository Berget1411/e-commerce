import { Types } from "mongoose";
import { CartItem } from "./cart";

export type UserRole = "admin" | "user";
export type AuthProvider = "local" | "google";

export type UserSchema = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  emailVerified: boolean;
  password?: string;
  role: UserRole;
  provider: AuthProvider;
  googleId?: string;
  likedProducts: Types.ObjectId[];
  cartItems: CartItem[];
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

export type UserResponse = Omit<
  UserSchema,
  "password" | "googleId" | "provider" | "createdAt" | "updatedAt"
>;

export type User = Omit<UserSchema, "password" | "googleId" | "provider">;
