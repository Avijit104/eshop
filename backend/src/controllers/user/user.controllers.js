// module
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// utility
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { mailSender } from "../../utils/mailContent.js";

// model
import { User } from "../../models/user.models.js";
import { Role } from "../../models/role.models.js";
import { Customer } from "../../models/customer.model.js";

// fetching user details
const getUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const role = req.role;
  const user = await Customer.findOne({ userId: _id }).populate({
    path: "userId",
  });
  if (!user) {
    throw new ApiError(404, "user not found");
  }

  const userRole = await Role.findOne({ userId: user._id, role: role });
  if (!userRole) {
    throw new ApiError(404, "user role not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "user fetched successful", {
      user: user,
      role: userRole.role,
    }),
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

// edit/update user name
const updateName = asyncHandler(async (req, res) => {
  const { firstName, lastName } = req.body;
  const { _id } = req.user;
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      $set: {
        firstName: firstName,
        lastName: lastName,
      },
    },
    { returnDocument: "after" },
  );
  if (!updatedUser) {
    throw new ApiError(404, "name updation failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "name updated successfully", updatedUser));
});

// update email
const updateEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { _id } = req.user;
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      $set: {
        email: email,
      },
    },
    { returnDocument: "after" },
  );

  if (!updatedUser) {
    throw new ApiError(404, "email updation failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "email updation successful", updatedUser));
});

// update mobile number
const updatePhno = asyncHandler(async (req, res) => {
  const { phno } = req.body;
  const { _id } = req.user;
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { $set: { phno: phno } },
    { returnDocument: "after" },
  );
  if (!updatedUser) {
    throw new ApiError(404, "mobile updation failed");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "mobile numbe updated successfully", updatedUser),
    );
});

// user Login
const login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "seller not found");
  }

  const passValidator = bcrypt.compare(password, user.password);
  if (!passValidator) {
    throw new ApiError(403, "invalid login credentials");
  }

  const userRole = await Role.findOne({ userId: user._id, role: role });
  if (!userRole) {
    throw new ApiError(403, "invalid login credentials");
  }

  const accessToken = user.generateDataToken(userRole.role);
  const refreshToken = user.generateDataToken(userRole.role);
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  const option = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(200, "seller login successful", {
        user: user,
        role: userRole.role,
      }),
    );
});

// user logout
const logout = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(
    _id,
    { $set: { refreshToken: "" } },
    { returnDocument: "after" },
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
  login,
  logout,
  getUser,
  changePassword,
  updateName,
  updateEmail,
  updatePhno,
};
