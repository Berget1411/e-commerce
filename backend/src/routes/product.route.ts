import { Router, RequestHandler } from "express";
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
import { asyncHandler } from "../utils/async-handler";

const router = Router();

router.get("/featured", getFeaturedProductsController as RequestHandler);
router.get("/recommended", getRecommendedProductsController as RequestHandler);
router.get(
  "/liked",
  isAuthenticated,
  getLikedProductsController as unknown as RequestHandler
);
router.get("/category/:category", asyncHandler(getProductByCategoryController));
router.get("/:id", asyncHandler(getProductByIdController));
router.get("/", asyncHandler(getAllProductsController));

router.post(
  "/",
  isAuthenticated as unknown as RequestHandler,
  isAdmin as unknown as RequestHandler,
  createProductController as unknown as RequestHandler
);
router.post(
  "/like/:productId",
  isAuthenticated as unknown as RequestHandler,
  toggleLikeController as unknown as RequestHandler
);

router.put(
  "/toggle-featured/:id",
  isAuthenticated as unknown as RequestHandler,
  isAdmin as unknown as RequestHandler,
  toggleFeaturedController as unknown as RequestHandler
);
router.put(
  "/:id",
  isAuthenticated as unknown as RequestHandler,
  isAdmin as unknown as RequestHandler,
  updateProductController as unknown as RequestHandler
);

router.delete(
  "/:id",
  isAuthenticated as unknown as RequestHandler,
  isAdmin as unknown as RequestHandler,
  deleteProductController as unknown as RequestHandler
);

export { router as productRouter };
