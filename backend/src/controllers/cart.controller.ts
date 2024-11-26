import { Request, Response } from "express";
import { User } from "../types/user.type";
import { User as UserModel } from "../models/user.model";
import { Types } from "mongoose";

// Add type for authenticated request
interface AuthenticatedRequest extends Request {
  user?: User;
}

export const getCartProductsController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as User;
    const currentUser = await UserModel.findById(user._id);
    if (!currentUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "Cart items fetched",
      cartItems: currentUser.cartItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const addToCartController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as User;
    const { productId } = req.body;
    const currentUser = await UserModel.findById(user._id);
    if (!currentUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const existingItem = currentUser.cartItems.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentUser.cartItems.push({
        productId: new Types.ObjectId(productId),
        quantity: 1,
      });
    }
    await currentUser.save();

    res.status(200).json({
      message: "Product added to cart",
      cartItems: currentUser.cartItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const removeAllFromCartController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as User;
    const { productId } = req.body;

    const currentUser = await UserModel.findById(user._id);
    if (!currentUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!productId) {
      currentUser.set("cartItems", []);
    } else {
      currentUser.set(
        "cartItems",
        currentUser.cartItems.filter(
          (item) => item.productId.toString() !== productId
        )
      );
    }

    await currentUser.save();

    res.status(200).json({
      message: "Products removed from cart",
      cartItems: currentUser.cartItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateQuantityController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user as User;

    const currentUser = await UserModel.findById(user._id);
    if (!currentUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const existingItem = currentUser.cartItems.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      if (quantity === 0) {
        currentUser.set(
          "cartItems",
          currentUser.cartItems.filter(
            (item) => item.productId.toString() !== productId
          )
        );
      } else {
        existingItem.quantity = quantity;
      }

      await currentUser.save();
      res.json({
        message: "Cart updated successfully",
        cartItems: currentUser.cartItems,
      });
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error in updateQuantity controller:", error);
    res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
