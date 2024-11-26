import { User } from "../types";
import Product from "../models/product.model";

export const getCartProductsByUserId = async (
  userCartItems: User["cartItems"]
) => {
  const products = await Product.find({ _id: { $in: userCartItems } });
  // add quantity for each product
  const cartProducts = products.map((product) => {
    const item = userCartItems.find((cartItem) => cartItem.id === product.id);
    return { ...product.toJSON(), quantity: item.quantity };
  });

  return cartProducts;
};

export const findCartItemByProductId = async (
  userCartItems: User["cartItems"],
  productId: string
) => {
  return userCartItems.find((item) => item.id === productId);
};

export const removeAllFromCart = async (productId: string, user: User) => {
  user.cartItems = user.cartItems.filter((item) => item.id !== productId);
  await user.save();
};
