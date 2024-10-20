import express from "express";
import { signUp, login, logout } from "../controllers/auth.controller";

const router = express.Router();

router.get("/sign-up", signUp);
router.get("/login", login);
router.get("/logout", logout);

export default router;
