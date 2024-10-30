import { products } from "../db/schema";
import db from "../db";
import { eq } from "drizzle-orm";
import { Product } from "../../types";

export const getAllProducts = async () => {
  const products = await db.query.products.findMany();
  return products;
};

export const getProductById = async (id: string) => {
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
  });
  return product;
};

export const getProductsByCategory = async (category: string) => {
  const productsByCategory = await db.query.products.findMany({
    where: eq(products.category, category),
  });
  return productsByCategory;
};

export const createProduct = async ({
  name,
  description,
  category,
  price,
  image,
}: Product) => {
  const newProduct = await db.insert(products).values({
    name,
    description,
    category,
    price: price.toString(),
    image,
  });
  return newProduct;
};

export const getFeaturedProducts = async () => {
  const featuredProducts = await db.query.products.findMany({
    where: eq(products.isFeatured, true),
  });
  return featuredProducts;
};

export const getRecommendations = async () => {
  const allProducts = await db.query.products.findMany();
  const shuffledProducts = [...allProducts].sort(() => Math.random() - 0.5);
  return shuffledProducts.slice(0, 3);
};

export const updateProduct = async (id: string, product: Product) => {
  const updatedProduct = await db
    .update(products)
    .set({
      ...product,
      price: product.price.toString(),
      updatedAt: new Date(),
    })
    .where(eq(products.id, id));
  return updatedProduct;
};

export const deleteProduct = async (id: string) => {
  const deletedProduct = await db.delete(products).where(eq(products.id, id));
  return deletedProduct;
};

export const toggleFeaturedProduct = async (id: string) => {
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
  });
  if (!product) {
    throw new Error("Product not found");
  }
  const updatedProduct = await db
    .update(products)
    .set({ isFeatured: !product?.isFeatured })
    .where(eq(products.id, id));
  return updatedProduct;
};
