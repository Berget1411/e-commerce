import { UserResponse as UserType } from "./user.type";

declare global {
  namespace Express {
    interface User extends Omit<UserType, "password"> {}
    interface Request {
      user?: User;
    }
  }
}
