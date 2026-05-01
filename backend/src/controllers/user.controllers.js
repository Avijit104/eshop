import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import mongoose from "mongoose";
import { mailSender } from "../utils/mailContent.js";
import bcrypt from "bcryptjs";

// fetching user details
const getUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  console.log("userid", _id);
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
  // const { username } = req.body;
  // const { _id } = req.user;
  // const user = await User.findByIdAndUpdate(
  //   _id,
  //   {
  //     $set: { username: username },
  //   },
  //   { new: true },
  // );
  // if (!user) {
  //   throw new ApiError(404, "user not found");
  // }
  // return res
  //   .status(200)
  //   .json(new ApiResponse(200, "username updated successfully", user));
});

// change user password
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    console.log("this is not user found");
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

// update user details
const updateUser = asyncHandler(async (req, res) => {
  const { email, username, gender, phno, password } = req.body;
  const { _id } = req.user;
  if (email && !username && !phno) {
    const user = await User.findByIdAndUpdate(
      _id,
      { $set: { email: email } },
      { returnDocument: "after" },
    );
    if (!user) {
      throw new ApiError(404, "user not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "updated user successfully", user));
  } else if (username && !email && !phno) {
    const user = await User.findByIdAndUpdate(
      _id,
      { $set: { username: username } },
      { returnDocument: "after" },
    );
    if (!user) {
      throw new ApiError(404, "user not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "updated user successfully", user));
  } else if (phno && !email && !username) {
    const user = await User.findByIdAndUpdate(
      _id,
      { $set: { phno: phno } },
      { returnDocument: "after" },
    );
    if (!user) {
      throw new ApiError(404, "user not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "updated user successfully", user));
  } else {
    throw new ApiError(401, "no user details provided");
  }
});

export { getUser, editUsername, changePassword, updateUser };
