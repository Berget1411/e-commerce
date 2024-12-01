import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/auth/oauth2/redirect/google",
    },
    async function verify(accessToken, refreshToken, profile, cb) {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0].value,
            emailVerified: true,
            provider: "google",
          });
        } else {
          user = await User.findOneAndUpdate(
            { email: profile.emails?.[0].value },
            {
              emailVerified: true,
            },
            { upsert: true, new: true }
          );
        }

        if (!user) {
          return cb(new Error("Failed to create/update user"), undefined);
        }

        const userObject = user.toObject({ getters: true });

        const userWithDates = {
          ...userObject,
          likedProducts: userObject.likedProducts || [],
          createdAt: new Date(userObject.createdAt),
          updatedAt: new Date(userObject.updatedAt),
        } satisfies Express.User;

        return cb(null, userWithDates);
      } catch (error) {
        return cb(error as Error);
      }
    }
  )
);
