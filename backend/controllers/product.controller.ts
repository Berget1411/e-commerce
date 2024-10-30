import { Request, Response } from "express";
import {
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductById,
  getProductsByCategory,
  getRecommendations,
  toggleFeaturedProduct,
  updateProduct,
} from "../data/product";
import redis from "../lib/redis";
import cloudinary from "../lib/cloudinary";
import { createProduct } from "../data/product";

async function updateFeatureProductsCache() {
  try {
    const featuredProducts = await getFeaturedProducts();
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.error("Error in updateFeatureProductsCache", error.message);
  }
}

export const handleGetAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error in getAllProducts", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const handleGetFeaturedProducts = async (
  req: Request,
  res: Response
) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.status(200).json(JSON.parse(featuredProducts as string));
    }
    // if no products in redis, fetch from db
    featuredProducts = await getFeaturedProducts();
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

export const handleGetRecommendations = async (req: Request, res: Response) => {
  try {
    const products = await getRecommendations();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getRecommendations", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const handleGetProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await getProductById(id);
  res.status(200).json(product);
};

export const handleGetProductsByCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { category } = req.params;
    const products = await getProductsByCategory(category);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getProductsByCategory", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const handleCreateProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, category, price, image } = req.body;
    let cloudinaryResponse;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await createProduct({
      name,
      description,
      category,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse?.secure_url
        : "",
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error in createProduct", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const handleUpdateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, category, price, image } = req.body;
    let cloudinaryResponse;
    if (image) {
      try {
        cloudinaryResponse = await cloudinary.uploader.upload(image, {
          folder: "products",
        });
      } catch (error) {
        console.error("Error in uploading image to cloudinary", error.message);
      }
    }
    const product = await updateProduct(id, {
      name,
      description,
      category,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse?.secure_url
        : "",
    });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error in handleUpdateProduct", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const handleDeleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.image) {
      const publicId = product.image.split("/").pop();
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(`products/${publicId}`);
          console.log("Image deleted from cloudinary");
        } catch (error) {
          console.error(
            "Error in deleting image from cloudinary",
            error.message
          );
        }
      }
    }
    const deletedProduct = await deleteProduct(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in handleDeleteProduct", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const handleToggleFeaturedProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const product = await toggleFeaturedProduct(id);
    await updateFeatureProductsCache();
    res.status(200).json(product);
  } catch (error) {
    console.error("Error in handleToggleFeaturedProduct", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
