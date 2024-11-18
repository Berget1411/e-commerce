import { Router } from "express";
import { signup } from "../controllers/auth.controller";
import { validateRequest } from "../../middleware/validation";
import { SignupValidationSchema } from "../../validation";

const router = Router();

router.post("/signup", validateRequest(SignupValidationSchema), signup);

export { router as authRouter };
