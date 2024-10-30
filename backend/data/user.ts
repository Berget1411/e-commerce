import { User } from "../types";
import db from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const findUserByEmail = async (email: string) => {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0];
};

export const findUserById = async (id: string) => {
  const result = await db.select().from(users).where(eq(users.id, id));
  return result[0];
};
export const createUser = async ({ name, email, password }: User) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db
      .insert(users)
      .values({ name, email, password: hashedPassword })
      .returning();
    return result;
  } catch (error) {
    return error;
  }
};
