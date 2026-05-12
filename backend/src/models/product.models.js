import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  sellerId: {
    type: mongoose.Types.ObjectId,
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
  },
  category: {
    type: String, // this will changed replaced by catagory constant
    trim: true,
    required: true,
  },
});

export const Product = mongoose.model("products", productSchema);
