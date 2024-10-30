import express from "express";
import {
  handleGetCoupon,
  handleValidateCoupon,
} from "../controllers/coupon.controller.ts";
import { protectRoute } from "../middleware/auth.middleware";
const router = express.Router();

router.get("/", protectRoute, handleGetCoupon);
router.get("/validate", protectRoute, handleValidateCoupon);

export default router;
