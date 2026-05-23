// utility
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

// models
import { Business } from "../../models/business.models.js";
import { Address } from "../../models/address.models.js";
import mongoose from "mongoose";

// get all user business details
const getAllUserBusiness = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const role = req.role;

  if (role !== "seller") {
    throw new ApiError(409, "unautherized access");
  }

  const business = await Business.find({
    sellerId: userId,
    visibility: true,
  });

  return res
    .status(200)
    .json(new ApiError(200, "all business fetched successful", business));
});

// get individual business details
const getBusiness = asyncHandler(async (req, res) => {
  const { businessId } = req.params;
  const role = req.role;

  if (role !== "seller") {
    throw new ApiError(409, "unautherized access");
  }

  const business = await Business.findOne({
    _id: businessId,
    visibility: true,
  }).populate({
    path: "address",
    match: {
      visibility: true,
    },
  });
  if (!business) {
    throw new ApiError(401, "fetching business details failed");
  }
  console.log(business);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "fetching business details successful", business),
    );
});

// edit business details
const editBusiness = asyncHandler(async (req, res) => {
  const { businessName, gst } = req.body;
  const { businessId } = req.params;
  const role = req.role;
  const userId = req.user._id;

  if (role !== "seller") {
    throw new ApiError(409, "unautherized access");
  }

  const updatedBusiness = await Business.findByIdAndUpdate(
    businessId,
    {
      $set: {
        businessName: businessName,
      },
    },
    { returnDocument: "after" },
  );

  if (!updatedBusiness) {
    throw new ApiError(401, "business details updated failed");
  }

  const business = await Business.findOne({
    _id: businessId,
    visibility: true,
  }).populate({
    path: "address",
    match: {
      visibility: true,
    },
  });

  if (!business) {
    throw new ApiError(404, "business not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "business updation successful", business));
});

// edit business address
const editBusinessAddress = asyncHandler(async (req, res) => {
  const { _id, userId, building, street, landmark, city, state, pin } =
    req.body;

  const id = new mongoose.Types.ObjectId(userId);
  const role = req.role;
  const sellerId = req.user._id;
  console.log(sellerId);
  console.log(id);

  if (role !== "seller") {
    throw new ApiError(409, "unauthorized access");
  }

  const address = await Address.findByIdAndUpdate(
    _id,
    {
      $set: {
        building: building,
        street: street,
        landmark: landmark,
        city: city,
        pin: pin,
        state: state,
      },
    },
    { returnDocument: "after" },
  );

  if (!address) {
    throw new ApiError(401, "business address updation failed");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "business address updation successful", address),
    );
});

// remove business
const removeBusiness = asyncHandler(async (req, res) => {
  const { businessId } = req.params;
  const role = req.role;
  const userId = req.user._id;

  if (role !== "seller") {
    throw new ApiError(409, "unauthorized access");
  }

  const business = await Business.findByIdAndUpdate(
    businessId,
    { $set: { visibility: false } },
    { returnDocument: "after" },
  );

  if (!business) {
    throw new ApiError(401, "business deletion failed");
  }

  const address = await Address.findByIdAndUpdate(
    business.address,
    { $set: { visibility: false } },
    { returnDocument: "after" },
  );
  if (!address) {
    business.visibility = true;
    await business.save({ validateBeforeSave: false });
    throw new ApiError(401, "business address deletion failed");
  }

  const allBusiness = await Business.find({
    sellerId: userId,
    visibility: true,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "business deletion successful", allBusiness));
});

export {
  getAllUserBusiness,
  getBusiness,
  editBusiness,
  editBusinessAddress,
  removeBusiness,
};
