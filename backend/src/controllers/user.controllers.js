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

  const { unHashedToken, hashedToken, expiry } = newUser.generateToken();

  const option = {
    email: newUser.email,
    subject: "Verify your email",
    mailgenContent: emailVerificationMail(
      newUser.username,
      `${req.protocol}://${req.get("host")}/api/v1/auth/email-verify/${unHashedToken}`,
    ),
  };

  await mailSender(option);

  newUser.emailVerificationToken = hashedToken;
  newUser.emailVerificationTokenExpiry = expiry;
  await newUser.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: newUser }, "user registration successful"),
    );
});

export { signup };
