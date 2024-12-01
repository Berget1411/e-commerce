import { Types } from "mongoose";

export type CartItem = {
  productId: Types.ObjectId;
  quantity: number;
};
