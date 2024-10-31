import db from "../db";
import { users, orders, products } from "../db/schema";
import { eq } from "drizzle-orm";
import { gte, lte, and } from "drizzle-orm";

export const getAnalyticsData = async () => {
  const allUsers = await db
    .select()
    .from(users)
    .where(eq(users.role, "customer"));
  const totalUsers = allUsers.length;

  const allOrders = await db.select().from(orders);
  const totalOrders = allOrders.length;

  const totalRevenue = allOrders.reduce((acc, order) => {
    return acc + order.totalAmount;
  }, 0);

  const allProducts = await db.select().from(products);
  const totalProducts = allProducts.length;

  return { totalUsers, totalOrders, totalRevenue, totalProducts };
};

export const getDailySalesData = async (startDate: Date, endDate: Date) => {
  const dailySalesData = await db
    .select()
    .from(orders)
    .where(
      and(gte(orders.createdAt, startDate), lte(orders.createdAt, endDate))
    );

  const salesByDay = dailySalesData.reduce<
    Record<string, { sales: number; revenue: number }>
  >((acc, order) => {
    const date = order.createdAt.toISOString().split("T")[0];
    if (!acc[date]) {
      acc[date] = { sales: 0, revenue: 0 };
    }
    acc[date].sales += 1;
    acc[date].revenue += order.totalAmount;
    return acc;
  }, {});

  const formattedData = Object.entries(salesByDay).map(([date, data]) => ({
    id: date,
    sales: data.sales,
    revenue: Number(data.revenue.toFixed(2)),
  }));

  return formattedData.sort((a, b) => a.id.localeCompare(b.id));
};
