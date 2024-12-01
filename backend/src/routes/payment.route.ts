import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import {
  checkoutSuccessController,
  createCheckoutSessionController,
  getOrdersController,
} from "../controllers/payment.controller";
import { Router, RequestHandler } from "express";

const router = express.Router();

router.post(
  "/create-checkout-session",
  isAuthenticated as unknown as RequestHandler,
  createCheckoutSessionController as unknown as RequestHandler
);
router.post(
  "/checkout-success",
  isAuthenticated as unknown as RequestHandler,
  checkoutSuccessController as unknown as RequestHandler
);
router.get(
  "/orders",
  isAuthenticated as unknown as RequestHandler,
  getOrdersController as unknown as RequestHandler
);
export { router as paymentRouter };
