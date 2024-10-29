import { products } from "../db/schema";
import db from "../db";
import { eq } from "drizzle-orm";
import { Product } from "../../types";

export const findAllProducts = async () => {
  const products = await db.query.products.findMany();
  return products;
};

export const getProductById = async (id: string) => {
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
  });
  return product;
};

export const createProduct = async ({
  name,
  description,
  category,
  price,
  image,
  isFeatured,
}: Product) => {
  const newProduct = await db.insert(products).values({
    name,
    description,
    category,
    price: price.toString(),
    image,
    isFeatured,
  });
  return newProduct;
};

export const findFeaturedProducts = async () => {
  const featuredProducts = await db.query.products.findMany({
    where: eq(products.isFeatured, true),
  });
  return featuredProducts;
};
