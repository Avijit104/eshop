import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import {
  emailVerificationMail,
  resetPasswordMail,
  mailSender,
} from "../utils/mailContent.js";
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

// fetching user details
const getUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw new ApiError(404, "user not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "user fetched successful", user));
});

// edit username
const editUsername = asyncHandler(async (req, res) => {
  const { username } = req.body;
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(
    _id,
    {
      $set: { username: username },
    },
    { new: true },
  );
  if (!user) {
    throw new ApiError(404, "user not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "username updated successfully", user));
});

// verify user email id
const verifyEmail = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { unHashedToken } = req.params;
  if (!unHashedToken) {
    throw new ApiError(404, "token not found");
  }
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");
  console.log(hashedToken);
  const user = await User.findOne({
    _id: _id,
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(401, "token expired");
  }

  user.isVerified = true;
  user.emailVerificationTokenExpiry = undefined;
  user.emailVerificationToken = undefined;

  await user.save({ validateBeforeSave: false });

  return res.redirect("http://localhost:5173/user");
});

// sending user email verification mail
const sendVerifyEmail = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  const user = await User.findById(_id);
  if (!user) {
    throw new ApiError(404, "user not found");
  }
  const { unHashedToken, hashedToken, expiry } = user.generateToken();

  const option = {
    email: user.email,
    subject: "Verify your email",
    mailgenContent: emailVerificationMail(
      user.username,
      `${req.protocol}://${req.get("host")}/api/v1/user/email-verify/${unHashedToken}`,
    ),
  };

  await mailSender(option);

  user.emailVerificationToken = hashedToken;
  user.emailVerificationTokenExpiry = expiry;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Email verifcation mail sent to your email id successfully",
      ),
    );
});

// change user password
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw new ApiError(404, "user not found");
  }
  const passValidator = bcrypt.compare(oldPassword, user.password);
  if (!passValidator) {
    throw new ApiError(401, "invalid credentials");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashedPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, "password changed successfully"));
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

export {
  signup,
  login,
  getUser,
  editUsername,
  verifyEmail,
  sendVerifyEmail,
  changePassword,
  logout,
};
