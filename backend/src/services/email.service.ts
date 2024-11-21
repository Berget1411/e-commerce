import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your email address",
      html: `
      <h1>Verify your email address</h1>
      <p>Click the link below to verify your email address:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link will expire in 1 hour.</p>
    `,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
}

export async function sendResetPasswordEmail(email: string, token: string) {
  const resetUrl = `${process.env.CLIENT_URL}/auth/new-password?token=${token}`;
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Reset your password",
      html: `
        <h1>Reset your password</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
      `,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw error;
  }
}
