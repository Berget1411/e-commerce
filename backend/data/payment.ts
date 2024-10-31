import { getCartItems } from "./cart";
import { getProductById } from "./product";
import { Product, ProductWithQuantity } from "../types";
export const getLineItems = async (cartId: string) => {
  const cartItems = await getCartItems(cartId);
  let totalAmount = 0;
  const productsWithQuantity: ProductWithQuantity[] = [];
  const lineItems = cartItems.map(async (item) => {
    const product = (await getProductById(item.productId)) as Product;
    const amount = product.price * item.quantity;
    totalAmount += amount;
    productsWithQuantity.push({ ...product, quantity: item.quantity });
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: amount * 100, // Convert to cents
      },
      quantity: item.quantity,
    };
  });
  return { lineItems, totalAmount, productsWithQuantity };
};
