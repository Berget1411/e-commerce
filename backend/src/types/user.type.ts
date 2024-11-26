import { CartItem } from "./cart";

export type User = {
  _id: any;
  name: string;
  email: string;
  emailVerified: boolean;
  password: string;
  role: string;
  cartItems: CartItem[];
};

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

export type UserResponse = Omit<User, "password">;
