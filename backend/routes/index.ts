import express from "express";
import authRoute from "./auth.route";
import productRoute from "./product.route";
import cartRoute from "./cart.route";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/products", productRoute);
router.use("/cart", cartRoute);
export default router;
