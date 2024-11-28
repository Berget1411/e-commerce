import { Request, Response } from "express";
import dotenv from "dotenv";
import Order from "../models/order.model";
import { Product } from "../models/product.model";
import stripe from "../lib/stripe";
import { User } from "../types/user.type";
import { Product as ProductModel } from "../models/product.model";
import { User as UserModel } from "../models/user.model";
dotenv.config();

export const createCheckoutSessionController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = req.user as User;
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    // Fetch products from database to get actual prices
    const productDetails = await Promise.all(
      products.map(async (item) => {
        const product = await ProductModel.findById(item.productId);
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }
        return {
          product,
          quantity: Number(item.quantity) || 1,
        };
      })
    );

    const lineItems = productDetails.map(({ product, quantity }) => {
      const amount = Math.round(product.price * 100);
      totalAmount += amount * quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: product.image ? [product.image] : [],
          },
          unit_amount: amount,
        },
        quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment/purchase-cancel`,
      metadata: {
        userId: user._id.toString(),
        products: JSON.stringify(
          productDetails.map(({ product, quantity }) => ({
            id: product._id,
            quantity,
            price: product.price,
          }))
        ),
      },
    });

    return res
      .status(200)
      .json({ id: session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.error("Error processing checkout:", error);
    return res.status(500).json({
      message: "Error processing checkout",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const checkoutSuccessController = async (
  req: Request,
  res: Response
) => {
  try {
    const { sessionId } = req.body;
    const user = req.user as User;
    const currentUser = await UserModel.findById(user._id);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // First check if order already exists
    const existingOrder = await Order.findOne({ stripeSessionId: sessionId });
    if (existingOrder) {
      return res.status(200).json({
        success: true,
        message: "Order already processed",
        order: existingOrder,
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    const products = JSON.parse(session.metadata?.products || "[]");

    // Use findOneAndUpdate with upsert to handle race conditions
    const newOrder = await Order.findOneAndUpdate(
      { stripeSessionId: sessionId },
      {
        user: session.metadata?.userId,
        products: products.map((product: any) => ({
          product: product.id,
          quantity: product.quantity,
          price: product.price,
        })),
        totalAmount: session.amount_total ? session.amount_total / 100 : 0,
        stripeSessionId: sessionId,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Payment successful and order created",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error processing successful checkout:", error);
    return res.status(500).json({
      success: false,
      message: "Error processing successful checkout",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getOrdersController = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    const currentUser = await UserModel.findById(user._id);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const orders = await Order.find({ user: currentUser._id });
    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Error getting orders:", error);
    return res.status(500).json({
      message: "Error getting orders",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
