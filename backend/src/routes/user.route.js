// router
import { Router } from "express";

// middlewares
import { validator } from "../middleware/validator.middle.js";
import { jwtValidator } from "../middleware/jwtValidator.middle.js";

// controllers
import {
  signup,
  login,
  getUser,
  editUsername,
  verifyEmail,
  sendVerifyEmail,
  changePassword,
} from "../controllers/user.controllers.js";

// validators
import {
  signupValidator,
  loginValidator,
  editUsernameValidator,
  changePasswordValidator,
} from "../validators/user.validator.js";

// router initialization
const router = Router();

// unsecured routes
router.route("/signup").post(signupValidator(), validator, signup);
router.route("/login").post(loginValidator(), validator, login);

// secure routes
router.route("/email-verify/:unHashedToken").get(jwtValidator, verifyEmail);
router.route("/verification-mail").get(jwtValidator, sendVerifyEmail);
router.route("/").get(jwtValidator, getUser);
router
  .route("/")
  .put(jwtValidator, editUsernameValidator(), validator, editUsername);

router
  .route("/change-password")
  .post(jwtValidator, changePasswordValidator(), validator, changePassword);

// export
export default router;
