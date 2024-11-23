import { Product } from "../models/product.model";

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

export const createProduct = async (product: Product) => {
  return await Product.create(product);
};

export const getProductById = async (id: string) => {
  return await Product.findById(id);
};

export const updateProduct = async (id: string, product: Product) => {
  return await Product.findByIdAndUpdate(id, product);
};

export const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};
