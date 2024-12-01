import { Router } from "express";
import morgan from "morgan";
import { errorHandler } from "../middleware/error-handler";
import { authRouter } from "./auth.route";
import { productRouter } from "./product.route";
import { reviewRouter } from "./review.route";
import { userRouter } from "./user.route";
import { cartRouter } from "./cart.route";
import { paymentRouter } from "./payment.route";

const router = Router();

// Request logging
if (process.env.NODE_ENV !== "test") {
  router.use(morgan("dev"));
}

// API routes
router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/reviews", reviewRouter);
router.use("/users", userRouter);
router.use("/cart", cartRouter);
router.use("/payment", paymentRouter);

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Error handling
router.use(errorHandler);

export { router as indexRouter };
