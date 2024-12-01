import { Review } from "./Review";

export type Product = {
  id: string;
  _id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  discount?: number;
  category: string;
  brand: string;
  target_audience: string;
  image: string;
  rating: number;
  quantity: number;
  reviews: Review[];
};

export type FilterOptions = {
  category: string[];
  brand: string[];
  target_audience: string[];
};
