// module
import mongoose, { Schema } from "mongoose";

//utility
import { roles, availableRole } from "../utils/constants.js";

// schema
const roleSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: availableRole,
      trim: true,
      default: roles.user,
    },
  },
  { timestamps: true },
);

export const Role = mongoose.model("roles", roleSchema);
