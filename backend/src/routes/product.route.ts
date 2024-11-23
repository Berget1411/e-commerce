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
} from "../controllers/product.controller";

const router = Router();

router.get("/", isAuthenticated, isAdmin, getAllProductsController);
router.get("/:id", getProductByIdController);
router.get("/featured", getFeaturedProductsController);
router.put(
  "/toggle-featured/:id",
  isAuthenticated,
  isAdmin,
  toggleFeaturedController
);
router.get("/recommended", getRecommendedProductsController);
router.get("/category/:category", getProductByCategoryController);

router.post("/", isAuthenticated, isAdmin, createProductController);

router.put("/:id", isAuthenticated, isAdmin, updateProductController);
router.delete("/:id", isAuthenticated, isAdmin, deleteProductController);

export default router;
