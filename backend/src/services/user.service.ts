import { hashPassword } from "../utils/helpers";
import { CreateUserInput, User as UserType } from "../types/user.type";
import { User } from "../models/user.model";

export const findUserByEmail = async (
  email: string
): Promise<UserType | null> => {
  return await User.findOne({ email });
};

export const findUserById = async (id: string): Promise<UserType | null> => {
  return await User.findById(id);
};

export const createUser = async (user: CreateUserInput): Promise<UserType> => {
  const { name, email, password } = user;
  const hashedPassword = await hashPassword(password);
  return await User.create({
    name,
    email,
    password: hashedPassword,
  });
};

export const verifyUserEmail = async (userId: string) => {
  return await User.updateOne({ _id: userId }, { emailVerified: true });
};

export const toggleLike = async (userId: string, productId: string) => {
  const existingUser = await User.findById(userId);
  if (!existingUser) throw new Error("User not found");

  const productIndex = existingUser.likedProducts.indexOf(productId);
  if (productIndex === -1) {
    existingUser.likedProducts.push(productId);
    await existingUser.save();
    return { message: "Product has been liked" };
  } else {
    existingUser.likedProducts.splice(productIndex, 1);
    await existingUser.save();
    return { message: "Product has been unliked" };
  }
};

export const getLikedProducts = async (userId: string) => {
  return await User.findById(userId).populate("likedProducts");
};
