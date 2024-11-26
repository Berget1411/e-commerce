import passport from "passport";
import { Strategy } from "passport-local";
import { findUserByEmail, findUserById } from "../services/user.service";
import { comparePassword } from "../utils/helpers";

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

    // Convert to plain object and remove password
    const userObject = user.toObject();
    const { password: _, ...safeUser } = userObject;

    done(null, {
      _id: safeUser._id.toString(),
      name: safeUser.name,
      email: safeUser.email,
      emailVerified: safeUser.emailVerified,
      role: safeUser.role,
      cartItems: safeUser.cartItems,
    } as Express.User);
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
        user.password as string
      );
      if (!isPasswordValid) {
        return done(new Error("Invalid Credentials"), false);
      }

      const userObject = user.toObject();
      const { password: _, ...safeUser } = userObject;

      return done(null, safeUser as Express.User);
    } catch (error) {
      return done(error as Error, false);
    }
  })
);
