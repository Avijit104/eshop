// module
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// utility
import { gender, availableGender } from "../utils/constants.js";

// schema
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
      enum: availableGender,
    },
    phno: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },

    resetPasswordToken: String,
    resetPasswordTokenExpiry: Date,
    refreshToken: String,
  },
  { timestamps: true },
);

userSchema.methods.generateDataToken = function (role) {
  console.log("this is jwt role", role);
  return jwt.sign(
    {
      _id: this._id,
      role: role,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRY,
    },
  );
};
userSchema.methods.generateToken = function () {
  const unHashedToken = crypto.randomBytes(10).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");
  const expiry = Date.now() + 1000 * 60 * 20;
  return { unHashedToken, hashedToken, expiry };
};

export const User = mongoose.model("users", userSchema);
