import express from "express";
import {
  signUp,
  login,
  logout,
  refreshToken,
  getProfile,
} from "../controllers/auth.controller";
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoute, getProfile);

export default router;
