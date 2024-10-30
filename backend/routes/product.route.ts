import express from "express";
import {
  handleCreateProduct,
  handleGetFeaturedProducts,
  handleDeleteProduct,
  handleGetAllProducts,
  handleGetProductById,
  handleUpdateProduct,
  handleGetRecommendations,
  handleGetProductsByCategory,
} from "../controllers/product.controller";
import { protectRoute, adminRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", protectRoute, adminRoute, handleGetAllProducts);
router.get("/featured", handleGetFeaturedProducts);
router.get("/recommendations", handleGetRecommendations);
router.get("/category/:category", handleGetProductsByCategory);
router.post("/", protectRoute, adminRoute, handleCreateProduct);
router.get("/:id", protectRoute, adminRoute, handleGetProductById);
router.put("/:id", protectRoute, adminRoute, handleUpdateProduct);
router.put(
  "/toggle-featured/:id",
  protectRoute,
  adminRoute,
  handleToggleFeaturedProduct
);
router.delete("/:id", protectRoute, adminRoute, handleDeleteProduct);

export default router;
