import { body } from "express-validator";

// utility
import { availableGender, gender } from "../../utils/constants.js";

// validator
const signupValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("please enter a valid email"),
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("first name is required")
      .isLength({ min: 3 })
      .withMessage("username must be longer than 3 characters"),
    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("last name is required")
      .isLength({ min: 2 })
      .withMessage("username must be longer than 3 characters"),
    body("gender")
      .trim()
      .optional()
      .isIn(availableGender)
      .withMessage("invalid gender"),
    body("phno")
      .trim()
      .notEmpty()
      .withMessage("phone number field is required")
      .isLength({ min: 10, max: 10 })
      .withMessage("phone number must be equal to 10 characters long"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("password must be longer than 8 characters "),
  ];
};

const emailValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("email field is required")
      .isEmail()
      .withMessage("invalid email"),
  ];
};

export { signupValidator, emailValidator };
