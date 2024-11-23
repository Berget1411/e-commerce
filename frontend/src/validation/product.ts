import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  target_audience: z.enum(["men", "women", "kids"]),
  brand: z.string().min(1),
  price: z.number().min(1),
  quantity: z.number().min(1),
  discount: z.number().min(0).max(100),
  featured: z.boolean(),
  image: z.string().min(1),
});
