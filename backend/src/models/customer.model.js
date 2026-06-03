import mongoose, { Schema } from "mongoose";

// utility
import { gender, availableGender } from "../utils/constants.js";

const customerSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  phno: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
    enum: availableGender,
  },
});

export const Customer = mongoose.model("customer", customerSchema);
