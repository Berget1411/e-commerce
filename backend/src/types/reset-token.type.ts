import { Types } from "mongoose";

export type ResetToken = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  token: string;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateResetTokenInput = Omit<
  ResetToken,
  "_id" | "createdAt" | "updatedAt"
>;
