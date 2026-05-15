// router
import { Router } from "express";

// middlewares
import { validator } from "../../middleware/validator.middle.js";
import { jwtValidator } from "../../middleware/jwtValidator.middle.js";

// controllers
import {
  signup,
  emailOtp,
  loginOtp,
  loginOtpSend,
} from "../../controllers/customer/auth.controllers.js";

// validators
import {
  signupValidator,
  loginValidator,
  emailValidator,
} from "../../validators/customer/auth.validator.js";
import { roleValidator } from "../../validators/user/role.validator.js";

// router initialization
const router = Router();

// unsecured routes

router.route("/send-otp").post(emailValidator(), validator, emailOtp);

router
  .route("/signup")
  .post(signupValidator(), validator, roleValidator(), validator, signup);

router.route("/login-otp-send").post(emailValidator(), validator, loginOtpSend);

router.route("/login-otp").post(emailValidator(), validator, loginOtp);

// export
export default router;
