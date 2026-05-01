import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

export const jwtValidator = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token);
  if (!token) {
    throw new ApiError(401, "token is missing");
  }
  try {
    console.log("this is also wrong");
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decodedToken._id).select(
      "-password -email -username -isVerified -refreshToken -resetPasswordToken -resetPasswordTokenExpiry -emailVerificationToken -emailVerificationTokenExpiry -createdAt -updatedAt -__v",
    );
    if (!user) {
      console.log("this is wrong");
      throw new ApiError(404, "user not found");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    throw new ApiError(401, "invalid access token");
  }
});
