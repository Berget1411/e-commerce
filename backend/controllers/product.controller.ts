import { Request, Response } from "express";
import { findAllProducts, findFeaturedProducts } from "../data/product";
import redis from "../lib/redis";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await findAllProducts();
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error in getAllProducts", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getFeaturedProducts = async (req: Request, res: Response) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.status(200).json(JSON.parse(featuredProducts as string));
    }
    // if no products in redis, fetch from db
    featuredProducts = await findFeaturedProducts();
    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }
    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.status(200).json({ featuredProducts });
  } catch (error) {
    console.error("Error in getFeaturedProducts", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
