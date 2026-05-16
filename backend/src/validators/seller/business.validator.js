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
    body("address")
      .trim()
      .notEmpty()
      .withMessage("address is required")
      .custom((value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error("invalid address");
        }
      }),
    body("businessName")
      .trim()
      .notEmpty()
      .withMessage("business name is required"),
  ];
};

export { businessRegisterValidator };
