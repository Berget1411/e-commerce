import { hashPassword } from "../../utils/helpers";
import { CreateUserInput } from "../../types/user.type";
import { User } from "../models/user.model";

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const findUserById = async (id: string) => {
  return await User.findById(id);
};

export const createUser = async (user: CreateUserInput) => {
  const { name, email, password } = user;
  const hashedPassword = await hashPassword(password);
  return await User.create({ name, email, password: hashedPassword });
};
