import { Router } from "express";
import { signup, login, status } from "../controllers/auth.controller";
import { validateRequest } from "../middleware/validation";
import { SignupValidationSchema, LoginValidationSchema } from "../validation";
import passport from "passport";
import { isAuthenticated } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", validateRequest(SignupValidationSchema), signup);
router.post(
  "/login",
  validateRequest(LoginValidationSchema),
  passport.authenticate("local"),
  login
);
router.get("/status", isAuthenticated, status);

export { router as authRouter };
