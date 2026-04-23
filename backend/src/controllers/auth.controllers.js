import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// user registration
const signup = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(500).json(new ApiResponse(500, "user already exists"));
  }

  const salt = await bcrypt.genSalt(10);
  const hasedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    email,
    username,
    password: hasedPassword,
  });

  if (!newUser) {
    throw new ApiError(409, "user registration failed");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: newUser }, "user registration successful"),
    );
});

//user login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "user not found");
  }

  const passValidator = bcrypt.compare(password, user.password);
  if (!passValidator) {
    return res
      .status(409)
      .json(new ApiResponse(409, "invalid login credentials"));
  }

  const refreshToken = user.generateDataToken();
  const accessToken = user.generateDataToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, "http://localhost:5173/user", user));
});

// user logout
const logout = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(
    _id,
    { $set: { refreshToken: "" } },
    { new: true },
  );

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, "user logged out successfully"));
});

export { signup, login, logout };
