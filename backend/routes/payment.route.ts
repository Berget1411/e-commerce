import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { handleCreateCheckoutSession } from "../controllers/payment.controller";

const router = express.Router();

router.post(
  "/create-checkout-session",
  protectRoute,
  handleCreateCheckoutSession
);
router.post("/checkout-success", protectRoute, handleCheckoutSuccess);

export default router;
