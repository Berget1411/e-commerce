import { Schema, model } from "mongoose";
import { InferSchemaType } from "mongoose";
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    target_audience: {
      type: String,
      required: true,
      enum: ["men", "women", "kids"],
    },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export type Product = Omit<
  InferSchemaType<typeof productSchema>,
  "createdAt" | "updatedAt"
>;

export const Product = model<Product>("Product", productSchema);
