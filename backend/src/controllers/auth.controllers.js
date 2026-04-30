import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { mailSender } from "../utils/mailContent.js";
import { error } from "console";

//email otp
const emailOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(401, "user already exists please login");
  }
  const otp = crypto.randomInt(100000, 1000000).toString();
  console.log(otp);
  const option = {
    email: email,
    subject: "User Registration Otp",
    mailGenContent: `${otp}`,
  };
  // const mail = await mailSender(option);
  // if (!mail) {
  //   throw new ApiError(401, "Otp mail sending error");
  // }
  res.status(200).json(new ApiResponse(200, "otp sent suuccessfully", otp));
});

// user registration
const signup = asyncHandler(async (req, res) => {
  const { email, username, gender, phno, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(401).json(new ApiResponse(401, "user already exists"));
  }

  const salt = await bcrypt.genSalt(10);
  const hasedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    email,
    username,
    gender,
    phno,
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

//user login otp send
const loginOtpSend = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "user not fuound");
  }
  console.log(user);
  const otp = crypto.randomInt(100000, 1000000).toString();
  const option = {
    email: email,
    subject: "User Registration Otp",
    mailGenContent: `${otp}`,
  };
  // const mail = await mailSender(option);
  // if (!mail) {
  //   throw new ApiError(401, "Otp mail sending error");
  // }
  res.status(200).json(new ApiResponse(200, "otp sent suuccessfully", otp));
});

//user login otp
const loginOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "user not found");
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
    .json(new ApiResponse(200, "user login successful", user));
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
    .json(new ApiResponse(200, "user login successful", user));
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

export { signup, login, logout, emailOtp, loginOtp, loginOtpSend };
