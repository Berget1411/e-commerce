import { Schema, model } from "mongoose";

type VerificationToken = {
  userId: Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
};

const verificationTokenSchema = new Schema<VerificationToken>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // Token expires in 1 hour
  },
});

export const VerificationToken = model<VerificationToken>(
  "VerificationToken",
  verificationTokenSchema
);
