import { Types } from "mongoose";

declare global {
  namespace Express {
    interface User {
      _id: Types.ObjectId;
      name: string;
      email: string;
      emailVerified: boolean;
      role: "admin" | "user";
      provider?: "local" | "google";
      cartItems: Array<{
        quantity: number;
        productId: Types.ObjectId;
      }>;
      likedProducts: Types.ObjectId[];
      createdAt: Date;
      updatedAt: Date;
    }
  }
}

export {};
