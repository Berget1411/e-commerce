import express from "express";
import {
  signUp,
  login,
  logout,
  refreshToken,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);

export default router;
