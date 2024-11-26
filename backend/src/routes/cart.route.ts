import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import {
  getCartProductsController,
  addToCartController,
  removeAllFromCartController,
  updateQuantityController,
} from "../controllers/cart.controller";

const router = Router();

router.get("/", isAuthenticated, getCartProductsController);
router.post("/", isAuthenticated, addToCartController);
router.delete("/", isAuthenticated, removeAllFromCartController);
router.put("/:id", isAuthenticated, updateQuantityController);

export { router as cartRouter };
