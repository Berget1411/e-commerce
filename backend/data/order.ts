import db from "../db";
import { orders } from "../db/schema";
import { Order, Product } from "../types";
import { getCartItems } from "./cart";
import { getProductById } from "./product";
export const createOrder = async (order: Order) => {
  const { userId, cartId, totalAmount, stripeSessionId } = order;
  const newOrder = await db
    .insert(orders)
    .values({ userId, cartId, totalAmount, stripeSessionId })
    .returning();
  await createOrderItems(newOrder[0].id, cartId);

  return newOrder[0];
};

const createOrderItems = async (orderId: string, cartId: string) => {
  const cartItems = await getCartItems(cartId);

  const orderItems = cartItems.map(async (item) => {
    const { id, productId, quantity } = item;
    const product = await getProductById(productId);
    return {
      id,
      orderId,
      productId,
      quantity,
      priceAtTime: product?.price,
    };
  });

  await db.insert(orderItems).values(orderItems);
};
