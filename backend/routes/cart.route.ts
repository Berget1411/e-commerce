import express from "express";
import {
  handleAddToCart,
  handleGetCartProducts,
  handleRemoveAllFromCart,
  handleUpdateQuantity,
} from "../controllers/cart.controller";
import { protectRoute } from "../middleware/auth.middleware";
const router = express.Router();
router.get("/", protectRoute, handleGetCartProducts);
router.post("/", protectRoute, handleAddToCart);
router.delete("/", protectRoute, handleRemoveAllFromCart);
router.put("/", protectRoute, handleUpdateQuantity);

export default router;
