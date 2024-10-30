import { and, eq } from "drizzle-orm";
import db from "../db";
import { cartItems, carts } from "../db/schema";

export const getCartItems = async (cartId: string) => {
  const cartProducts = await db.query.cartItems.findMany({
    where: eq(cartItems.cartId, cartId),
  });
  return cartProducts;
};

export const createCart = async (userId: string) => {
  const cart = await db.insert(carts).values({ userId }).returning();
  return cart;
};

export const findCartByUserId = async (userId: string) => {
  const cart = await db.query.carts.findFirst({
    where: eq(carts.userId, userId),
  });
  return cart;
};

export const productExistsInCart = async (
  cartId: string,
  productId: string
) => {
  const cartItem = await db.query.cartItems.findFirst({
    where: and(
      eq(cartItems.cartId, cartId),
      eq(cartItems.productId, productId)
    ),
  });
  return cartItem;
};

export const addProductToCart = async (cartId: string, productId: string) => {
  const cartItem = await db
    .insert(cartItems)
    .values({ cartId, productId })
    .returning();
  return cartItem;
};

export const updateCartItemQuantity = async (id: string, quantity: number) => {
  const cartItem = await db
    .update(cartItems)
    .set({ quantity })
    .where(eq(cartItems.id, id))
    .returning();
  return cartItem;
};
export const removeProductFromCart = async (
  cartId: string,
  productId: string
) => {
  const cartItem = await db
    .delete(cartItems)
    .where(
      and(eq(cartItems.cartId, cartId), eq(cartItems.productId, productId))
    )
    .returning();
  return cartItem;
};

export const removeAllProductsFromCart = async (cartId: string) => {
  const cartProducts = await db
    .delete(cartItems)
    .where(eq(cartItems.cartId, cartId))
    .returning();
  return cartProducts;
};
