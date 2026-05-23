// modules
import mongoose, { Schema } from "mongoose";

// schema
const businessSchema = new Schema(
  {
    sellerId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    gst: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: mongoose.Types.ObjectId,
      ref: "address",
      required: true,
      trim: true,
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    visibility: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true },
);

export const Business = mongoose.model("business", businessSchema);
