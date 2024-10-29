import { Request, Response } from "express";
import { getAllProducts } from "../data/product";

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error in getAllProductsController", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
