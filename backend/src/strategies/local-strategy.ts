import passport from "passport";
import { Strategy } from "passport-local";
import { findUserByEmail, findUserById } from "../services/user.service";
import { comparePassword } from "../utils/helpers";
import { User as UserModel } from "../models/user.model";

passport.serializeUser((user: Express.User, done) => {
  console.log("Serializing user:", user);
  const userDoc = (user as any)?._doc || user;
  if (!userDoc?._id) {
    return done(new Error("Invalid user object"));
  }
  done(null, userDoc._id.toString());
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await findUserById(id);
    if (!user) {
      return done(new Error("User Not Found"), null);
    }

    const userObject = user.toObject({ getters: true });
    const { password: _, ...safeUser } = userObject;

    const userWithDates = {
      ...safeUser,
      likedProducts: safeUser.likedProducts || [],
      createdAt: new Date(safeUser.createdAt),
      updatedAt: new Date(safeUser.updatedAt),
    } satisfies Express.User;

    done(null, userWithDates);
  } catch (error) {
    done(error as Error, null);
  }
});

export default passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await findUserByEmail(email);
      if (!user) {
        return done(new Error("User Not Found"), false);
      }

      const isPasswordValid = await comparePassword(
        password,
        (user as InstanceType<typeof UserModel>).password as string
      );
      if (!isPasswordValid) {
        return done(new Error("Invalid Credentials"), false);
      }

      const userObject = user.toObject({ getters: true });
      const { password: _, ...safeUser } = userObject;

      const userWithDates = {
        ...safeUser,
        likedProducts: safeUser.likedProducts || [],
        createdAt: new Date(safeUser.createdAt),
        updatedAt: new Date(safeUser.updatedAt),
      } satisfies Express.User;

      return done(null, userWithDates);
    } catch (error) {
      return done(error as Error, false);
    }
  })
);
