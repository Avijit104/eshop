// module
import bcrypt from "bcryptjs";
import crypto from "crypto";

// utility
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { mailSender } from "../../utils/mailContent.js";

// model
import { User } from "../../models/user.models.js";
import { Role } from "../../models/role.models.js";

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
  const { email, firstName, lastName, gender, phno, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(401).json(new ApiResponse(401, "user already exists"));
  }

  const salt = await bcrypt.genSalt(10);
  const hasedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    email,
    firstName,
    lastName,
    gender,
    phno,

    password: hasedPassword,
  });

  if (!newUser) {
    throw new ApiError(409, "user registration failed");
  }
  const accessToken = newUser.generateDataToken("user");
  const refreshToken = newUser.generateDataToken("user");
  const option = {
    httpOnly: true,
    secure: true,
  };

  newUser.refreshToken = refreshToken;
  await newUser.save({ validateBeforeSave: false });

  const userRole = await Role.create({
    userId: newUser._id,
  });

  if (!userRole) {
    throw new ApiError(401, "user role is not defined");
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(200, "user registration successful", {
        user: newUser,
        role: userRole.role,
      }),
    );
});

//user login otp send
const loginOtpSend = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "user not fuound");
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

//user login otp
const loginOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "user not found");
  }
  const userRole = await Role.findOne({ userId: user._id, role: "user" });
  if (!userRole) {
    throw new ApiError(404, "role not found");
  }

  const refreshToken = user.generateDataToken(userRole.role);
  const accessToken = user.generateDataToken(userRole.role);

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
    .json(
      new ApiResponse(200, "user login successful", {
        user: user,
        role: userRole.role,
      }),
    );
});

export { signup, emailOtp, loginOtp, loginOtpSend };
