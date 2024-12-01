import { User as CustomUser } from "./user.type";

declare global {
  namespace Express {
    interface User extends Omit<CustomUser, keyof Document> {}
  }
}

export {};
