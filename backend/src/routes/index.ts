import { Router } from "express";
import { authRouter } from "./auth.route";
import { productRouter } from "./product.route";
import { reviewRouter } from "./review.route";
import { userRouter } from "./user.route";
import { cartRouter } from "./cart.route";
import { paymentRouter } from "./payment.route";
const router = Router();

router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/reviews", reviewRouter);
router.use("/users", userRouter);
router.use("/cart", cartRouter);
router.use("/payment", paymentRouter);
export { router as indexRouter };
