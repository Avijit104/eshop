// utility
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

// models
import { Product } from "../../models/product.models.js";
import { Business } from "../../models/business.models.js";

// add product
const addProduct = asyncHandler(async (req, res) => {
  const { businessId, name, desc, price, discount, category } = req.body;
  const { _id } = req.user;
  const role = req.role;

  if (role !== "seller") {
    throw new ApiError(409, "unautherized access");
  }

  const newProduct = await Product.create({
    businessId,
    name,
    desc,
    price,
    discount,
    category,
  });

  if (!newProduct) {
    throw new ApiError(401, "adding product failed");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "adding new product successful", newProduct));
});

// fetch all produts listed by user
const getAllUserProducts = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const role = req.role;

  if (role !== "seller") {
    throw new ApiError(409, "unautherized access");
  }

  const products = await Business.aggregate([
    {
      $match: {
        sellerId: _id,
      },
    },
    {
      $group: {
        _id: null,
        businessIds: { $push: "$_id" },
      },
    },
    {
      $lookup: {
        from: "products",
        let: { businessIds: "$businessIds" },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$businessId", "$$businessIds"],
              },
              visibility: true,
            },
          },
        ],
        as: "products",
      },
    },
    {
      $unwind: "$products",
    },
    {
      $replaceRoot: { newRoot: "$products" },
    },
  ]);

  if (!products) {
    throw new ApiError(404, "products not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "fetching all seller products successful", products),
    );
});

// fetch all products listed under a business
const getBusinessProducts = asyncHandler(async (req, res) => {
  const role = req.role;
  const { businessId } = req.params;

  if (role !== "seller") {
    throw new ApiError(409, "unautherized access");
  }

  const products = await Product.find({
    businessId: businessId,
    visibility: true,
  });

  if (!products) {
    throw new ApiError(404, "products not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "fetching all business products", products));
});

// edit a product
const editProduct = asyncHandler(async (req, res) => {
  const { name, desc, price, category } = req.body;
  const { productId } = req.params;
  const role = req.role;
  if (role !== "seller") {
    throw new ApiError(409, "unautherized access");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      $set: {
        name,
        desc,
        price,
        category,
      },
    },
    { returnDocument: "after" },
  );
  if (!updatedProduct) {
    throw new ApiError(401, "product updation failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "product updation successful", updatedProduct));
});

// delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const role = req.role;
  if (role !== "seller") {
    throw new ApiError(409, "unautherized access");
  }

  const deletedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      $set: {
        visibility: false,
      },
    },
    { returnDocument: "after" },
  );
  if (!deletedProduct) {
    throw new ApiError(401, "product deletion failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "product deletion successful", deletedProduct));
});

// add discount to product
const addDiscount = asyncHandler(async (req, res) => {
  const { discount } = req.body;
  const { productId } = req.params;
  const role = req.role;
  if (role !== "seller") {
    throw new ApiError(409, "unautherized access");
  }

  const discountProduct = await Product.findByIdAndUpdate(
    productId,
    {
      $set: {
        discount,
      },
    },
    { returnDocument: "after" },
  );

  if (!discountProduct) {
    throw new ApiError(401, "appling discount failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "appling discount successful", discountProduct));
});

export {
  addProduct,
  getAllUserProducts,
  getBusinessProducts,
  editProduct,
  deleteProduct,
  addDiscount,
};
