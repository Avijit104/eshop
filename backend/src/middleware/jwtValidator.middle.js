// module
import jwt from "jsonwebtoken";

// utility
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// model
import { User } from "../models/user.models.js";
import { Role } from "../models/role.models.js";

// jwt token validator
export const jwtValidator = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new ApiError(401, "token is missing");
  }
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decodedToken);
    const user = await User.findById(decodedToken._id).select(
      "-password -email -username -isVerified -refreshToken -resetPasswordToken -resetPasswordTokenExpiry -emailVerificationToken -emailVerificationTokenExpiry -createdAt -updatedAt -__v",
    );

    if (!user) {
      throw new ApiError(404, "user not found");
    }
    console.log(user);
    req.user = user;
    req.role = decodedToken.role;
    console.log("req user", req.role);
    next();
  } catch (error) {
    throw new ApiError(401, "invalid access token");
  }
});
