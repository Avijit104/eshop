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

  const business = await Business.aggregate([
    {
      $match: {
        sellerId: userId,
        visibility: true,
      },
    },
    {
      $lookup: {
        from: "addresses",
        localField: "address",
        foreignField: "_id",
        pipeline: [
          {
            $match: {
              visibility: true,
            },
          },
        ],
        as: "address",
      },
    },
    {
      $unwind: "$address",
    },
  ]);

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

  const objectId = new mongoose.Types.ObjectId(businessId);

  const business = await Business.aggregate([
    {
      $match: {
        _id: objectId,
        visibility: true,
      },
    },
    {
      $lookup: {
        from: "addresses",
        localField: "address",
        foreignField: "_id",
        pipeline: [
          {
            $match: {
              visibility: true,
            },
          },
        ],
        as: "address",
      },
    },
    {
      $unwind: "$address",
    },
  ]);
  if (!business) {
    throw new ApiError(401, "fetching business details failed");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, "fetching business details successful", business),
    );
});

// edit business details
const editBusiness = asyncHandler(async (req, res) => {
  const { gst, businessName } = req.body;
  const { businessId } = req.params;
  const role = req.role;

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
  return res
    .status(200)
    .json(
      new ApiResponse(200, "business updation successful", updatedBusiness),
    );
});

// edit business address
const editBusinessAddress = asyncHandler(async (req, res) => {
  const { building, street, landmark, city, state, pin } = req.body;
  const { addressId } = req.params;
  const role = req.role;
  const userId = req.user._id;

  if (role !== "seller") {
    throw new ApiError(409, "unauthorized access");
  }

  const addressPermission = await Address.findOne({
    _id: addressId,
    userId: userId,
  });

  if (!addressPermission) {
    throw new ApiError(403, "user does not permission to do this");
  }

  const address = await Address.findByIdAndUpdate(
    addressId,
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

  return res
    .status(200)
    .json(new ApiResponse(200, "business deletion successful"));
});

export {
  getAllUserBusiness,
  getBusiness,
  editBusiness,
  editBusinessAddress,
  removeBusiness,
};
