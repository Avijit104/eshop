import { body } from "express-validator";
import { availableGender, gender } from "../utils/constants.js";

const signupValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("please enter a valid email"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("username is required")
      .isLength({ min: 3 })
      .withMessage("username must be longer than 3 characters"),
    body("gender")
      .trim()
      .notEmpty()
      .withMessage("gender field is required")
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

const loginValidator = () => {
  return [
    body("email")
      .trim()
      .isEmail()
      .withMessage("enter a valid email id")
      .notEmpty()
      .withMessage("email is required"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("password must be 8 characters long"),
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

export { signupValidator, loginValidator, emailValidator };
