import { Request, Response } from "express";
import {
  addProductToCart,
  productExistsInCart,
  removeAllProductsFromCart,
  removeProductFromCart,
  updateCartItemQuantity,
  findCartByUserId,
  getCartItems,
} from "../data/cart";
export const handleGetCartProducts = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const cart = await findCartByUserId(user.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const cartItems = await getCartItems(cart.id);
    res.status(200).json({ cartItems });
  } catch (error) {
    console.error("Error in handleGetCartProducts", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const handleAddToCart = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = await productExistsInCart(user.cartId, productId);
    if (existingItem) {
      await updateCartItemQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      await addProductToCart(user.cartId, productId);
    }
    res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    console.error("Error in handleAddToCart", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const handleRemoveAllFromCart = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    const cart = await findCartByUserId(user.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    if (!productId) {
      await removeAllProductsFromCart(cart.id);
    } else {
      await removeProductFromCart(cart.id, productId);
    }
    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    console.error("Error in handleRemoveAllFromCart", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const handleUpdateQuantity = async (req: Request, res: Response) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const cart = await findCartByUserId(user.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const existingProduct = await productExistsInCart(cart.id, productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    if (quantity <= 0) {
      await removeProductFromCart(cart.id, productId);
    } else {
      await updateCartItemQuantity(existingProduct.id, quantity);
    }

    res.status(200).json({ message: "Cart item quantity updated" });
  } catch (error) {
    console.error("Error in handleUpdateQuantity", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
