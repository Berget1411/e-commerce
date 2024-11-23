import { Router } from "express";
import { authRouter } from "./auth.route";
import { productRouter } from "./product.route";
const router = Router();

router.use("/auth", authRouter);
router.use("/products", productRouter);
export { router as indexRouter };
