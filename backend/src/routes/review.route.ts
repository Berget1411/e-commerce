import { Router } from "express";
import {
  createReviewController,
  deleteReviewController,
  getReviewsByProductIdController,
  updateReviewController,
} from "../controllers/review.controller";
import { isAuthenticated } from "../middleware/auth.middleware";

const router = Router();

router.post("/", isAuthenticated, createReviewController);
router.get("/:productId", getReviewsByProductIdController);
router.put("/:reviewId", isAuthenticated, updateReviewController);
router.delete("/:reviewId", isAuthenticated, deleteReviewController);
export { router as reviewRouter };
