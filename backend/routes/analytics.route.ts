import { Router } from "express";
import { handleGetAnalytics } from "../controllers/analytics.controller";
import { protectRoute, adminRoute } from "../middleware/auth.middleware";
const router = Router();

router.get("/", protectRoute, adminRoute, handleGetAnalytics);

export default router;
