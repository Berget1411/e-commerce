import { Product, Review } from "../models/product.model";

export const getReviewById = async (productId: string, reviewId: string) => {
  const product = await Product.findById(productId);
  return product?.reviews.find((review) => review._id.toString() === reviewId);
};

export const createReview = async (
  productId: string,
  review: Omit<Review, "_id">
) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { $push: { reviews: review } },
    { new: true }
  );
  return updatedProduct?.reviews[updatedProduct.reviews.length - 1];
};

export const getReviewByProductIdAndUserId = async (
  productId: string,
  userId: string
) => {
  const product = await Product.findById(productId);
  return product?.reviews.find((review) => review.userId.toString() === userId);
};

export const getReviewsByProductId = async (productId: string) => {
  const product = await Product.findById(productId);
  return product?.reviews || [];
};

export const updateReview = async (
  productId: string,
  reviewId: string,
  reviewData: Partial<Review>
) => {
  const product = await Product.findOneAndUpdate(
    {
      _id: productId,
      "reviews._id": reviewId,
    },
    {
      $set: {
        "reviews.$.rating": reviewData.rating,
        "reviews.$.comment": reviewData.comment,
        "reviews.$.updatedAt": new Date(),
      },
    },
    { new: true }
  );
  return product?.reviews.find((review) => review._id.toString() === reviewId);
};

export const deleteReview = async (productId: string, reviewId: string) => {
  const product = await Product.findByIdAndUpdate(
    productId,
    { $pull: { reviews: { _id: reviewId } } },
    { new: true }
  );
  return product !== null;
};

export const getAverageRating = async (productId: string) => {
  const product = await Product.findById(productId);
  if (!product?.reviews.length) return 0;
  return (
    product.reviews.reduce((sum, review) => sum + review.rating, 0) /
    product.reviews.length
  );
};
