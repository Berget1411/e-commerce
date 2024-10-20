import express from "express";
import {
  signUp,
  createAccount,
  login,
  logout,
} from "../controllers/auth.controller";

const router = express.Router();

router.get("/sign-up", signUp);
router.post("/create-account", createAccount);
router.get("/login", login);
router.get("/logout", logout);

export default router;
