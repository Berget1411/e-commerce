import express from "express";
import authRoute from "./auth.route";
import productRoute from "./product.route";
import cartRoute from "./cart.route";
import couponRoute from "./coupon.route";
import paymentRoute from "./payment.route";
const router = express.Router();

router.use("/auth", authRoute);
router.use("/products", productRoute);
router.use("/cart", cartRoute);
router.use("/coupon", couponRoute);
router.use("/payment", paymentRoute);
export default router;
