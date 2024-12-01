import { Router } from "express";
import {
  signup,
  login,
  status,
  logout,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller";
import { validateRequest } from "../middleware/validation";
import { SignupValidationSchema, LoginValidationSchema } from "../validation";
import passport from "passport";
import { isAuthenticated } from "../middleware/auth.middleware";
import { RequestHandler } from "express";

const router = Router();

router.post("/signup", validateRequest(SignupValidationSchema), signup);
router.post(
  "/login",
  validateRequest(LoginValidationSchema),
  passport.authenticate("local"),
  login as RequestHandler
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
router.get("/status", isAuthenticated, status as RequestHandler);
router.post("/logout", logout as RequestHandler);

router.get("/verify-email/:token", verifyEmail as RequestHandler);

router.post("/resend-verification", resendVerificationEmail as RequestHandler);

router.post("/forgot-password", forgotPassword as RequestHandler);
router.post("/reset-password", resetPassword as RequestHandler);

export { router as authRouter };
