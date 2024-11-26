import { Request, Response } from "express";
import { User, Cart } from "../types";
import {
  findCartItemByProductId,
  getCartProductsByUserId,
  removeAllFromCart,
} from "../services/cart.service";

export const getCartProductsController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = req.user as User;
    const cartProducts = await getCartProductsByUserId(user.cartItems);
    res.status(200).json({ message: "Cart products fetched", cartProducts });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const addToCartController = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    const { productId } = req.body;
    const cartItem = await findCartItemByProductId(user.cartItems, productId);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      user.cartItems.push({ id: productId });
    }
    await user.save();
    res
      .status(200)
      .json({ message: "Product added to cart", cartItems: user.cartItems });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
export const removeAllFromCartController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = req.user as User;
    const { productId } = req.body;
    const cartItem = await findCartItemByProductId(user.cartItems, productId);
    if (cartItem) {
      await removeAllFromCart(productId, user);
    }

    res.status(200).json({
      message: "All products removed from cart",
      cartItems: user.cartItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateQuantityController = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    const productId = req.params.id;
    const { quantity } = req.body;

    const existingCartItem = await findCartItemByProductId(
      user.cartItems,
      productId
    );
    if (!existingCartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    if (quantity < 1) {
      await removeAllFromCart(productId, user);
    } else {
      existingCartItem.quantity = quantity;
      await user.save();
    }
    res.status(200).json({
      message: "Quantity updated",
      cartItems: user.cartItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
