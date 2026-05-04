import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { gender, availableGender } from "../utils/constants.js";
import { deflate } from "zlib";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
      enum: availableGender,
      default: gender.other,
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
    emailVerificationToken: String,
    emailVerificationTokenExpiry: Date,
    refreshToken: String,
  },
  { timestamps: true },
);

userSchema.methods.generateDataToken = function () {
  return jwt.sign(
    {
      _id: this._id,
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
