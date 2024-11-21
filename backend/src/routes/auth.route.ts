import { Router } from "express";
import {
  signup,
  login,
  status,
  logout,
  verifyEmail,
  resendVerificationEmail,
} from "../controllers/auth.controller";
import { validateRequest } from "../middleware/validation";
import { SignupValidationSchema, LoginValidationSchema } from "../validation";
import passport from "passport";
import { isAuthenticated } from "../middleware/auth.middleware";
import crypto from "crypto";
import { VerificationToken } from "../models/verification-token.model";
import { sendVerificationEmail } from "../services/email.service";

const router = Router();

router.post("/signup", validateRequest(SignupValidationSchema), signup);
router.post(
  "/login",
  validateRequest(LoginValidationSchema),
  passport.authenticate("local"),
  login
);
router.get(
  "/login/federated/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
  (req, res) => {
    res.send("Google authentication successful");
  }
);
router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=oauth-failed`,
  })
);
router.get("/status", isAuthenticated, status);
router.post("/logout", logout);

router.get("/verify-email/:token", verifyEmail);

router.post("/resend-verification", resendVerificationEmail);

export { router as authRouter };
