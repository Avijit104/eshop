//module
import bcrypt from "bcryptjs";

// utility
import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

// model
import { User } from "../../models/user.models.js";
import { Role } from "../../models/role.models.js";
import { Business } from "../../models/business.models.js";
import { Address } from "../../models/address.models.js";

// registering Seller
const registerSeller = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, gender, phno, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const existingUserRole = await Role.create({
      userId: existingUser._id,
      role: "seller",
    });
    if (!existingUserRole) {
      throw new ApiError(401, "role updation failed");
    }
    const refresh = existingUser.generateDataToken();
    const access = existingUser.generateDataToken();
    existingUser.refreshToken = refresh;
    await existingUser.save({ validateBeforeSave: false });

    const existingOption = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", access, existingOption)
      .cookie("refreshToken", refresh, existingOption)
      .json(
        new ApiResponse(200, "user registration successful", {
          user: existingUser,
          role: existingUserRole.role,
        }),
      );
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
  const accessToken = newUser.generateDataToken();
  const refreshToken = newUser.generateDataToken();
  const option = {
    httpOnly: true,
    secure: true,
  };

  newUser.refreshToken = refreshToken;
  await newUser.save({ validateBeforeSave: false });

  const userRole = await Role.create({
    userId: newUser._id,
    role: "seller",
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

// add business address
const addBusinessAddress = asyncHandler(async (req, res) => {
  const { name, phno, street, building, landmark, city, pin, state } = req.body;
  const { _id } = req.user;

  const newAddress = await Address.create({
    userId: _id,
    name,
    phno,
    street,
    building,
    landmark,
    city,
    pin,
    state,
    addressType: "business",
  });

  if (!newAddress) {
    throw new ApiError(409, "add address failed");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "adding address successful", newAddress));
});

// registering a business
const registerBusiness = asyncHandler(async (req, res) => {
  const { gst, address, businessName } = req.body;
  const { _id } = req.user;

  const newBusiness = await Business.create({
    sellerId: _id,
    gst,
    address,
    businessName,
  });

  if (!newBusiness) {
    throw new ApiError(401, "business registration failed");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "business registration successful", newBusiness),
    );
});

// seller Login
const loginSeller = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "seller not found");
  }

  const passValidator = bcrypt.compare(password, user.password);
  if (!passValidator) {
    throw new ApiError(403, "invalid login credentials");
  }

  const accessToken = user.generateDataToken();
  const refreshToken = user.generateDataToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const userRole = await Role.findOne({ userId: user._id, role: "seller" });
  if (!userRole) {
    throw new ApiError(403, "invalid login credentials");
  }

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

export { registerSeller, addBusinessAddress, registerBusiness, loginSeller };
