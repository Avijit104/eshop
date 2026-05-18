import { body } from "express-validator";
import mongoose from "mongoose";

const businessRegisterValidator = () => {
  return [
    body("gst")
      .trim()
      .notEmpty()
      .withMessage("gst field is required")
      .isLength({ min: 15, max: 15 })
      .withMessage("invalid gst number"),
    body("address").trim().notEmpty().withMessage("address is required"),
    body("businessName")
      .trim()
      .notEmpty()
      .withMessage("business name is required"),
  ];
};

const editBusinessValidator = () => {
  return [
    body("businessName")
      .trim()
      .notEmpty()
      .withMessage("business name is required"),
  ];
};

const ediBusinesstAddressValidator = () => {
  return [
    body("street")
      .trim()
      .notEmpty()
      .withMessage("street/locality is required")
      .isLength({ max: 256 })
      .withMessage("street/locality can be max 256 characters long"),
    body("building")
      .trim()
      .optional()
      .isLength({ max: 20 })
      .withMessage("building name or number at most 10 characters long"),
    body("landmark")
      .trim()
      .notEmpty()
      .withMessage("landmark is required")
      .isLength({ max: 100 })
      .withMessage("landmark at most 100 characters long"),
    body("city")
      .trim()
      .notEmpty()
      .withMessage("city is required")
      .isLength({ max: 20 })
      .withMessage("city at most 20 characters long"),
    body("pin")
      .trim()
      .notEmpty()
      .withMessage("pin is required")
      .isLength({ max: 6, min: 6 })
      .withMessage("pin must be 6 characters long"),
    body("state")
      .trim()
      .notEmpty()
      .withMessage("state is required")
      .isLength({ max: 20 })
      .withMessage("state at most 20 characters long"),
  ];
};

export {
  businessRegisterValidator,
  ediBusinesstAddressValidator,
  editBusinessValidator,
};
