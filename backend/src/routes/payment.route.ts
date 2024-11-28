import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import {
  checkoutSuccessController,
  createCheckoutSessionController,
} from "../controllers/payment.controller";

const router = express.Router();

router.post(
  "/create-checkout-session",
  isAuthenticated,
  createCheckoutSessionController
);
router.post("/checkout-success", isAuthenticated, checkoutSuccessController);

export { router as paymentRouter };
