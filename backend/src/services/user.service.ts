import { hashPassword } from "../utils/helpers";
import { CreateUserInput, User as UserType } from "../types/user.type";
import { User as UserModel } from "../models/user.model";
import { Types } from "mongoose";
import type { Document } from "mongoose";

export const findUserByEmail = async (
  email: string
): Promise<InstanceType<typeof UserModel> | null> => {
  return await UserModel.findOne({ email });
};

export const findUserById = async (
  id: string
): Promise<InstanceType<typeof UserModel> | null> => {
  return await UserModel.findById(id);
};

export const createUser = async (
  user: CreateUserInput
): Promise<InstanceType<typeof UserModel>> => {
  const { name, email, password } = user;
  const hashedPassword = await hashPassword(password);
  return await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });
};

export const verifyUserEmail = async (userId: string) => {
  return await UserModel.updateOne({ _id: userId }, { emailVerified: true });
};

export const toggleLike = async (userId: string, productId: string) => {
  const existingUser = await UserModel.findById(userId);
  if (!existingUser) throw new Error("User not found");

  const productObjectId = new Types.ObjectId(productId);
  const productIndex = existingUser.likedProducts.findIndex((id) =>
    id.equals(productObjectId)
  );

  if (productIndex === -1) {
    existingUser.likedProducts.push(productObjectId);
    await existingUser.save();
    return { message: "Product has been liked" };
  } else {
    existingUser.likedProducts.splice(productIndex, 1);
    await existingUser.save();
    return { message: "Product has been unliked" };
  }
};

export const getLikedProducts = async (userId: string) => {
  const user = await UserModel.findById(userId);
  return user?.likedProducts || [];
};
