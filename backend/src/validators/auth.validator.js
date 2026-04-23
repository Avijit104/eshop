import { body } from "express-validator";

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
    body("password").trim().notEmpty().withMessage("password is required"),
  ];
};

const editUsernameValidator = () => {
  return [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("username is required")
      .isLength({ min: 3 })
      .withMessage("username must be 3 characters long"),
  ];
};

const changePasswordValidator = () => {
  return [
    body("oldPassword")
      .trim()
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("password must be longer than 8 characters "),
    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("password must be longer than 8 characters "),
  ];
};

export {
  signupValidator,
  loginValidator,
  editUsernameValidator,
  changePasswordValidator,
};
