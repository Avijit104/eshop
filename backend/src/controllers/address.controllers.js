import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Address } from "../models/address.models.js";

// add address
const addAddress = asyncHandler(async (req, res) => {
  const {
    name,
    phno,
    street,
    building,
    landmark,
    city,
    pin,
    state,
    addressType,
  } = req.body;
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
    addressType,
  });

  if (!newAddress) {
    throw new ApiError(409, "add address failed");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "adding address successful", newAddress));
});

// get all address of user
const getAllAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const address = await Address.find({
    userId: _id,
  }).select("-userId -createdAt -updatedAt -__v");
  if (address.length === 0) {
    throw new ApiError(404, "addresses not found");
  }
  console.log("addresses", address);
  return res
    .status(200)
    .json(new ApiResponse(200, "fetching all addresses successful", address));
});

// delete user address by id
const deleteAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedAddress = await Address.findByIdAndDelete(id);
  if (!deletedAddress) {
    throw new ApiError(404, "address not found");
  }
  console.log(deletedAddress);
  return res
    .status(200)
    .json(new ApiResponse(200, "address fetched successfully", currAddress));
});

// edit specific address
const editAddress = asyncHandler(async (req, res) => {
  const {
    name,
    phno,
    street,
    building,
    landmark,
    city,
    pin,
    state,
    addressType,
  } = req.body;
  const { id } = req.params;
  const editedAddress = await Address.findByIdAndUpdate(
    id,
    {
      $set: {
        userId: req.user._id,
        name,
        phno,
        street,
        building,
        landmark,
        city,
        pin,
        state,
        addressType,
      },
    },
    { returnDocument: after },
  );
  if (!editedAddress) {
    throw new ApiError(402, "address updation failed");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "address updation successful", editedAddress));
});

//export
export { addAddress, getAllAddress, deleteAddress, editAddress };
