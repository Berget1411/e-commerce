import { Types } from "mongoose";

export type TargetAudience = "unisex" | "men" | "women" | "kids";
export type ProductCategory = "clothing" | "shoes" | "accessories" | "sports";

export type Review = {
  _id: Types.ObjectId;
  rating: number;
  comment: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  category: ProductCategory;
  target_audience: TargetAudience;
  brand: string;
  price: number;
  quantity: number;
  discount?: number;
  featured: boolean;
  image: string;
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
};

export type CreateProductInput = Omit<
  Product,
  "_id" | "reviews" | "createdAt" | "updatedAt"
>;

export type UpdateProductInput = Partial<CreateProductInput>;
