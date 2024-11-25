import { Schema, model } from "mongoose";
import { InferSchemaType } from "mongoose";

const reviewSchema = new Schema(
  {
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    target_audience: {
      type: String,
      required: true,
      enum: ["unisex", "men", "women", "kids"],
    },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    discount: { type: Number },
    featured: { type: Boolean, default: false },
    image: { type: String, required: true },
    reviews: { type: [reviewSchema], default: [] },
  },
  { timestamps: true }
);

export type Review = Omit<
  InferSchemaType<typeof reviewSchema>,
  "createdAt" | "updatedAt"
>;

export type Product = Omit<
  InferSchemaType<typeof productSchema>,
  "createdAt" | "updatedAt"
>;

export const Product = model<Product>("Product", productSchema);
