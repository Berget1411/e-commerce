import { Request, Response } from "express";
import {
  getAllProducts,
  getFeaturedProducts,
  getProductById,
  toggleFeatured,
  updateProduct,
  deleteProduct,
  createProduct,
  getRecommendedProducts,
  getProductsByCategory,
} from "../services/product.service";
import { redis } from "../lib/redis";
import cloudinary from "../lib/cloudinary";

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFeaturedProductsController = async (
  req: Request,
  res: Response
) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.status(200).json(JSON.parse(featuredProducts as string));
    }
    // if not in redis, get from db
    featuredProducts = await getFeaturedProducts();
    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }
    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.status(200).json(featuredProducts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRecommendedProductsController = async (
  req: Request,
  res: Response
) => {
  try {
    const recommendedProducts = await getRecommendedProducts();
    if (!recommendedProducts) {
      return res.status(404).json({ message: "No recommended products found" });
    }
    res.status(200).json(recommendedProducts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductByCategoryController = async (
  req: Request,
  res: Response
) => {
  const { category } = req.params;
  try {
    const products = await getProductsByCategory(category);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleFeaturedController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { featured } = req.body;
  try {
    const product = await toggleFeatured(id, featured);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createProductController = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      target_audience,
      brand,
      category,
      quantity,
      price,
      discount,
      featured,
      image,
    } = req.body;
    let cloudinaryResponse;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await createProduct({
      name,
      description,
      target_audience,
      brand,
      category,
      quantity,
      price,
      discount,
      featured,
      image: cloudinaryResponse?.secure_url || "",
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      target_audience,
      brand,
      category,
      quantity,
      price,
      discount,
      featured,
      image,
    } = req.body;
    let cloudinaryResponse;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }
    const product = await updateProduct(id, {
      name,
      description,
      target_audience,
      brand,
      category,
      quantity,
      price,
      discount,
      featured,
      image: cloudinaryResponse?.secure_url || "",
    });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.image) {
      const publicId = product.image.split("/").pop();
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
          console.log("Image deleted from cloudinary");
        } catch (error) {
          console.error("Error deleting image from cloudinary", error);
        }
      }
    }
    await deleteProduct(id);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
