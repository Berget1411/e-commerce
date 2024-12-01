import { Types } from "mongoose";

export type VerificationToken = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  token: string;
  createdAt: Date;
};

export type CreateVerificationTokenInput = Omit<
  VerificationToken,
  "_id" | "createdAt"
>;
