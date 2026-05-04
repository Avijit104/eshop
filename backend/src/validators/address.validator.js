import { body } from "express-validator";
import { availableAddress } from "../utils/constants.js";

const addressValidator = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("name field is required")
      .isLength({ min: 3 })
      .withMessage("name atleast 3 characters long"),
    body("phno")
      .trim()
      .notEmpty()
      .withMessage("phone no is required")
      .isLength({ min: 10, max: 10 })
      .withMessage("phone no must be 10 characters long"),
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
    body("addressType")
      .trim()
      .notEmpty()
      .withMessage("address type is required")
      .isIn(availableAddress)
      .withMessage("invalid address type"),
  ];
};

export { addressValidator };
