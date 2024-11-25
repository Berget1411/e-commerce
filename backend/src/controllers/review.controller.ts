import { Request, Response } from "express";
import type { User } from "../models/user.model";
import {
  createReview,
  deleteReview,
  getReviewById,
  getReviewByProductIdAndUserId,
  getReviewsByProductId,
  updateReview,
} from "../services/review.service";
import { getProductById } from "../services/product.service";

export const getReviewsByProductIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { productId } = req.params;
    const reviews = await getReviewsByProductId(productId);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createReviewController = async (req: Request, res: Response) => {
  try {
    const { productId, rating, comment } = req.body;
    const user = req.user as typeof User;

    const existingReview = await getReviewByProductIdAndUserId(
      productId,
      user._id
    );
    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this product",
      });
    }

    const review = await createReview(productId, {
      rating,
      comment,
      userId: user._id,
    });

    const updatedProduct = await getProductById(productId);
    res.status(201).json({
      message: "Review created successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const updateReviewController = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;
    const { productId, rating, comment } = req.body;
    const user = req.user as User;

    const existingReview = await getReviewById(productId, reviewId);

    if (!existingReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (existingReview.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await updateReview(productId, reviewId, {
      rating,
      comment,
      userId: existingReview.userId,
    });

    const updatedProduct = await getProductById(productId);
    res.status(200).json({
      message: "Review updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteReviewController = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;
    const { productId } = req.body;
    const user = req.user as User;

    const existingReview = await getReviewById(productId, reviewId);
    if (!existingReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (existingReview.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const success = await deleteReview(productId, reviewId);
    if (!success) {
      return res.status(404).json({ message: "Review not found" });
    }

    const updatedProduct = await getProductById(productId);
    res.status(200).json({
      message: "Review deleted successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
