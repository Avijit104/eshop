import { body } from "express-validator";
import mongoose from "mongoose";

const productValidator = () => {
  return [
    body("businessId")
      .trim()
      .custom((value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error("invalid businessid");
        }
      })
      .notEmpty()
      .withMessage("business id is required"),
    body("name")
      .trim()
      .notEmpty()
      .withMessage("name is required")
      .isLength({ max: 256 })
      .withMessage("name shoud not be more than 256 character long"),
    body("desc")
      .trim()
      .notEmpty()
      .withMessage("name is required")
      .isLength({ max: 256 })
      .withMessage("description shoud not be more than 256 character long"),
    body("price")
      .trim()
      .notEmpty()
      .withMessage("price is required")
      .isNumeric()
      .withMessage("price must be a number"),
    body("discount")
      .trim()
      .optional()
      .isNumeric()
      .withMessage("discount must be a number"),
  ];
};

const prooductEditValidator = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("name is required")
      .isLength({ max: 256 })
      .withMessage("name shoud not be more than 256 character long"),
    body("desc")
      .trim()
      .notEmpty()
      .withMessage("name is required")
      .isLength({ max: 256 })
      .withMessage("description shoud not be more than 256 character long"),
    body("price")
      .trim()
      .notEmpty()
      .withMessage("price is required")
      .isNumeric()
      .withMessage("price must be a number"),
  ];
};

const discountValidaor = () => {
  return [
    body("discount")
      .trim()
      .optional()
      .isNumeric()
      .withMessage("discount must be a number"),
  ];
};

export { productValidator, prooductEditValidator, discountValidaor };
