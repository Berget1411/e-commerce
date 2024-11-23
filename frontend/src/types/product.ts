export type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  target_audience: "men" | "women" | "kids";
  brand: string;
  price: number;
  quantity: number;
  discount: number;
  featured: boolean;
  image: string;
};
