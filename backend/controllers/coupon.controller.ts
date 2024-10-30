import { Request, Response } from "express";
import {
  getCouponByUserId,
  validateCoupon,
  deactivateCoupon,
} from "../data/coupon";
import { User } from "../types";
export const handleGetCoupon = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    const coupon = await getCouponByUserId(user.id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json({ coupon });
  } catch (error) {
    console.error("Error in handleGetCoupon", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const handleValidateCoupon = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;
    const user = req.user as User;
    const coupon = await validateCoupon(code as string, user.id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    if (coupon.expiresAt < new Date()) {
      await deactivateCoupon(coupon.id);
      return res.status(400).json({ message: "Coupon expired" });
    }
    res.status(200).json({
      message: "Coupon validated",
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
    });
  } catch (error) {
    console.error("Error in handleValidateCoupon", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
