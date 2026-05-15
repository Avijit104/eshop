import { body } from "express-validator";

// validator
const updateUserNameValidator = () => {
  return [
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("first name is required")
      .isLength({ min: 3 })
      .withMessage("first name must be 3 characters long"),
    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("last name is required")
      .isLength({ min: 3 })
      .withMessage("last name must be 3 characters long"),
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

const updateEmailValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("please enter a valid email"),
  ];
};

const updatePhnoValidator = () => {
  return [
    body("phno")
      .trim()
      .notEmpty()
      .withMessage("phone number field is required")
      .isLength({ min: 10, max: 10 })
      .withMessage("phone number must be equal to 10 characters long"),
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
  loginValidator,
  updateEmailValidator,
  changePasswordValidator,
  updatePhnoValidator,
  updateUserNameValidator,
};
