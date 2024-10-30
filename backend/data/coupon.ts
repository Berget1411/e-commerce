import { and, eq } from "drizzle-orm";
import { coupons } from "../db/schema";
import db from "../db";

export const getCouponByUserId = async (userId: string) => {
  const coupon = await db.query.coupons.findFirst({
    where: and(eq(coupons.userId, userId), eq(coupons.isActive, true)),
  });
  return coupon;
};
export const validateCoupon = async (code: string, userId: string) => {
  const coupon = await db.query.coupons.findFirst({
    where: and(
      eq(coupons.code, code),
      eq(coupons.userId, userId),
      eq(coupons.isActive, true)
    ),
  });
  return coupon;
};
export const deactivateCoupon = async (id: string) => {
  await db.update(coupons).set({ isActive: false }).where(eq(coupons.id, id));
};
