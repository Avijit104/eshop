import mongoose, { Schema } from "mongoose";
import { availableAddress, addressType } from "../utils/constants.js";

const addressSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phno: {
      type: String,
      required: true,
      trim: true,
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    building: {
      type: String,
      trim: true,
      default: "",
    },
    landmark: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    pin: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    addressType: {
      type: String,
      required: true,
      enum: availableAddress,
      default: addressType.home,
    },
  },
  { timestamps: true },
);
export const Address = mongoose.model("address", addressSchema);
