import { Router, RequestHandler } from "express";
import {
  createReviewController,
  deleteReviewController,
  getReviewsByProductIdController,
  updateReviewController,
} from "../controllers/review.controller";
import { isAuthenticated } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  isAuthenticated as unknown as RequestHandler,
  createReviewController as unknown as RequestHandler
);

router.get(
  "/:productId",
  getReviewsByProductIdController as unknown as RequestHandler
);

router.put(
  "/:reviewId",
  isAuthenticated as unknown as RequestHandler,
  updateReviewController as unknown as RequestHandler
);

router.delete(
  "/:reviewId",
  isAuthenticated as unknown as RequestHandler,
  deleteReviewController as unknown as RequestHandler
);

export { router as reviewRouter };
