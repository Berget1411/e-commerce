import { User } from "../types";
import { Product } from "../models/product.model";
import { CartItem } from "../types/cart";
import { User as UserModel } from "../models/user.model";

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
  const userDoc = await UserModel.findById(user._id);
  if (!userDoc) throw new Error("User not found");

  userDoc.cartItems.pull({ id: productId });
  await userDoc.save();
  return userDoc.cartItems;
};

export const addToCart = async (
  cartItem: CartItem,
  user: User,
  productId: string
) => {
  const userDoc = await UserModel.findById(user._id);
  if (!userDoc) throw new Error("User not found");

  if (cartItem) {
    const existingItem = userDoc.cartItems.find(
      (item) => item.id === productId
    );
    if (existingItem) {
      existingItem.quantity += 1;
    }
  } else {
    userDoc.cartItems.push({ id: productId, quantity: 1 });
  }

  await userDoc.save();
  return userDoc.cartItems;
};
