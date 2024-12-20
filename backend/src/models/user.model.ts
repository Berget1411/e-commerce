import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    password: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    provider: { type: String, enum: ["local", "google"], default: "local" },
    // sparse: true means the unique index allows multiple documents to have no value for this field
    // This is useful for optional unique fields like googleId that only exist for Google OAuth users
    googleId: { type: String, sparse: true },
    likedProducts: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
      default: [],
    },
    cartItems: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
