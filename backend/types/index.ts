export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
  role?: "customer" | "admin";
  emailVerified?: Date;
  image?: string;
};

export type Product = {
  id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  isFeatured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ProductWithQuantity = Product & {
  quantity: number;
};

export type Cart = {
  id?: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CartItem = {
  id?: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Coupon = {
  id?: string;
  code: string;
  discountPercentage: number;
  expiresAt: Date;
  isActive?: boolean;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Order = {
  id?: string;
  cartId: string;
  userId: string;
  totalAmount: number;
  stripeSessionId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type OrderItem = {
  id?: string;
  orderId: string;
  productId: string;
  priceAtTime: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
};
