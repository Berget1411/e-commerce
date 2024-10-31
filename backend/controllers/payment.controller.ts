import { Request, Response } from "express";
import { getLineItems } from "../data/payment";
import {
  createNewCoupon,
  deactivateCoupon,
  validateCoupon,
} from "../data/coupon";
import { Coupon, Order, ProductWithQuantity } from "../types";
import stripe from "../lib/stripe";
import { createOrder } from "../data/order";

const createStripeCoupon = async (discountPercentage: number) => {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });
  return coupon.id;
};

const generateNewCoupon = async (userId: string) => {
  const newCoupon = await createNewCoupon({
    userId,
    code: "GIFT" + Math.random().toString(36).substring(2, 15),
    discountPercentage: 10,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days from now
  });
  return newCoupon;
};

export const handleCreateCheckoutSession = async (
  req: Request,
  res: Response
) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { cartId, couponCode } = req.body;
    let { lineItems, totalAmount, productsWithQuantity } = await getLineItems(
      cartId
    );

    const resolvedLineItems = await Promise.all(lineItems);

    let coupon: Coupon | undefined = undefined;
    if (couponCode) {
      coupon = (await validateCoupon(couponCode, user.id)) as
        | Coupon
        | undefined;

      if (coupon) {
        totalAmount -= Math.round(
          totalAmount * (coupon.discountPercentage / 100)
        );
      }
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: resolvedLineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/purchase-failed`,
      discounts: coupon
        ? [{ coupon: await createStripeCoupon(coupon.discountPercentage) }]
        : [],
      metadata: {
        userId: user.id,
        couponCode: coupon?.code || "",
        products: JSON.stringify(
          productsWithQuantity.map((product: ProductWithQuantity) => ({
            id: product.id,
            quantity: product.quantity,
            price: product.price,
          }))
        ),
        cartId,
        totalAmount,
      },
    });
    if (totalAmount >= 20000) {
      const newCoupon = await generateNewCoupon(user.id);
    }
    res
      .status(200)
      .json({ sessionId: session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.log("Error in handleCreateCheckoutSession", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleCheckoutSuccess = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      if (session.metadata?.couponCode) {
        await deactivateCoupon(session.metadata.couponCode);
      }
    }
    const products = JSON.parse(session.metadata?.products || "[]");
    const newOrder = await createOrder({
      userId: session.metadata?.userId,
      cartId: session.metadata?.cartId,
      totalAmount: session.amount_total,
      stripeSessionId: session.id,
    } as Order);

    res.status(200).json({
      success: true,
      message: "Checkout successful",
      orderId: newOrder.id,
    });
  } catch (error) {
    console.error("Error in handleCheckoutSuccess", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
