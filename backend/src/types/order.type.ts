import { Types } from "mongoose";

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

export type OrderItem = {
  product: Types.ObjectId;
  quantity: number;
  price: number;
};

export type Order = {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  products: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  stripeSessionId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateOrderInput = Omit<
  Order,
  "_id" | "status" | "createdAt" | "updatedAt"
>;

export type OrderResponse = Omit<Order, "user"> & {
  user: {
    _id: Types.ObjectId;
    name: string;
    email: string;
  };
};
