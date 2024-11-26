import { Router } from "express";
import { isAdmin } from "../middleware/admin.middleware";
import { isAuthenticated } from "../middleware/auth.middleware";
import {
  getAllProductsController,
  getFeaturedProductsController,
  toggleFeaturedController,
  createProductController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
  getRecommendedProductsController,
  getProductByCategoryController,
  getLikedProductsController,
  toggleLikeController,
} from "../controllers/product.controller";

const router = Router();

router.get("/featured", getFeaturedProductsController);
router.get("/recommended", getRecommendedProductsController);
router.get("/liked", isAuthenticated, getLikedProductsController);
router.get("/category/:category", getProductByCategoryController);
router.get("/:id", getProductByIdController);
router.get("/", getAllProductsController);

router.post("/", isAuthenticated, isAdmin, createProductController);
router.post("/like/:productId", isAuthenticated, toggleLikeController);

router.put(
  "/toggle-featured/:id",
  isAuthenticated,
  isAdmin,
  toggleFeaturedController
);
router.put("/:id", isAuthenticated, isAdmin, updateProductController);

router.delete("/:id", isAuthenticated, isAdmin, deleteProductController);

export { router as productRouter };
