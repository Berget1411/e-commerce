import crypto from "crypto";
import { ResetToken } from "../models/reset-token.model";

export async function createResetToken(userId: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const resetToken = new ResetToken({
    userId,
    token,
    expires: new Date(Date.now() + 3600000), // 1 hour
  });
  await resetToken.save();
  return resetToken;
}

export async function findResetTokenByToken(token: string) {
  return ResetToken.findOne({
    token,
    expires: { $gt: new Date() },
  });
}

export async function deleteResetToken(token: string) {
  await ResetToken.deleteOne({ token });
}
