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

  const userRole = await Role.create({
    userId: newUser._id,
  });

  if (!userRole) {
    throw new ApiError(401, "user role is not defined");
  }
  console.log({ ...newUser });
  return res.status(200).json(
    new ApiResponse(200, "user registration successful", {
      user: newUser,
      role: userRole.role,
    }),
  );
});

// seller registration
const sellerRegistration = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, gender, phno, password, role, pan } =
    req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new ApiError(401, "user already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    email,
    firstName,
    lastName,
    gender,
    phno,
    password: hashedPassword,
  });

  if (!newUser) {
    throw new ApiError(402, "seller registration failed");
  }

  const userRole = await Role.create({
    userId: newUser._id,
    role,
    pan,
  });

  if (!userRole) {
    throw new ApiError(402, "role assignment failed");
  }

  return res.status(200).json(
    new ApiResponse(200, "seller registration successful", {
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
  const userRole = await Role.findOne({ userId: user._id });
  if (!userRole) {
    throw new ApiError(404, "role not found");
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
    .json(
      new ApiResponse(200, "user login successful", {
        user: user,
        role: userRole.role,
      }),
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

  const userRole = await Role.findOne({ userId: user._id });
  if (!userRole) {
    throw new ApiError(404, "role not found");
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
    .json(
      new ApiResponse(200, "user login successful", {
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

const becomeSeller = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { role, pan } = req.body;
  const existingRole = await Role.findOne({ userId: _id });
  if (!existingRole || existingRole.role === "seller") {
    throw new ApiError(402, "role updation failed");
  }

  const newRole = await Role.findByIdAndUpdate(
    existingRole._id,
    {
      $set: {
        role: role,
        pan: pan,
      },
    },
    { returnDocument: "after" },
  );
  if (!newRole) {
    throw new ApiError(401, "role updation failed");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "role updation successful", { role: newRole.role }),
    );
});

export {
  signup,
  login,
  logout,
  emailOtp,
  loginOtp,
  loginOtpSend,
  sellerRegistration,
};
