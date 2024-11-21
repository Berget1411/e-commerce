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
