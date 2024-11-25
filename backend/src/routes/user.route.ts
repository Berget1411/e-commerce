import { Router } from "express";
import { getUserByIdController } from "../controllers/user.controller";
const router = Router();

router.get("/:userId", getUserByIdController);

export { router as userRouter };
