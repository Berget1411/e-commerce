import { Product } from "../models/product.model";
import { CreateProductInput } from "../types/product.type";

export const getAllProducts = async () => {
  return await Product.find();
};

export const getFeaturedProducts = async () => {
  return await Product.find({ featured: true });
};

export const getRecommendedProducts = async () => {
  const allProducts = await getAllProducts();
  const shuffledProducts = [...allProducts].sort(() => 0.5 - Math.random());
  return shuffledProducts.slice(0, 3);
};

export const getProductsByCategory = async (category: string) => {
  return await Product.find({ category });
};

export const toggleFeatured = async (id: string, featured: boolean) => {
  return await Product.findByIdAndUpdate(id, { featured });
};

export const createProduct = async (productData: CreateProductInput) => {
  return await Product.create(productData);
};

export const getProductById = async (id: string) => {
  return await Product.findById(id);
};

export const updateProduct = async (
  id: string,
  productData: CreateProductInput
) => {
  return await Product.findByIdAndUpdate(id, productData);
};

export const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};
