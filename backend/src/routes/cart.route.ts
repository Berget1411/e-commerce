import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import {
  getCartProductsController,
  addToCartController,
  removeAllFromCartController,
  updateQuantityController,
} from "../controllers/cart.controller";

const router = Router();

router.get("/", isAuthenticated, getCartProductsController as any);
router.post("/", isAuthenticated, addToCartController as any);
router.delete("/", isAuthenticated, removeAllFromCartController as any);
router.put("/:id", isAuthenticated, updateQuantityController as any);

export { router as cartRouter };
