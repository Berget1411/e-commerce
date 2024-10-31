import { Request, Response } from "express";
import { getAnalyticsData, getDailySalesData } from "../data/analytics";

export const handleGetAnalytics = async (req: Request, res: Response) => {
  try {
    const analytics = await getAnalyticsData();
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

    const dailySalesData = await getDailySalesData(startDate, endDate);

    res.status(200).json({ analytics, dailySalesData });
  } catch (error) {
    console.error("Error in handleGetAnalytics", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
