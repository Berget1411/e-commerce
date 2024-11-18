export type User = {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  password: string;
  role: string;
};

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

export type UserResponse = Omit<User, "password">;
