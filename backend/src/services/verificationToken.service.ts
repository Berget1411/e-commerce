import { VerificationToken } from "../models/verification-token.model";
import crypto from "crypto";

export const createVerificationToken = async (userId: string) => {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  return await VerificationToken.create({
    userId,
    token: verificationToken,
  });
};

export const findVerificationTokenByToken = async (token: string) => {
  return await VerificationToken.findOne({ token });
};

export const deleteVerificationToken = async (token: string) => {
  return await VerificationToken.deleteOne({ token });
};
