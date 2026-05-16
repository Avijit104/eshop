// module
import mongoose, { Schema } from "mongoose";

//Schema
const productSchema = new Schema({
  businessId: {
    type: mongoose.Types.ObjectId,
    ref: "businesses",
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  desc: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  discount: {
    type: Number,
    trim: true,
    default: 0,
  },
  category: {
    type: String, // this will changed replaced by catagory constant
    trim: true,
    required: true,
  },
});

export const Product = mongoose.model("products", productSchema);
