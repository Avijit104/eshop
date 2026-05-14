import { Router } from "express";

// middleware
import { jwtValidator } from "../../middleware/jwtValidator.middle.js";
import { validator } from "../../middleware/validator.middle.js";

// controllers
import {
  registerBusiness,
  registerSeller,
  addBusinessAddress,
  loginSeller,
} from "../../controllers/seller/auth.controller.js";

// validator
import {
  signupValidator,
  loginValidator,
} from "../../validators/customer/auth.validator.js";
import { addressValidator } from "../../validators/customer/address.validator.js";
import { businessRegisterValidator } from "../../validators/seller/business.validator.js";

const router = Router();

// unsecure routes
router.route("/signup").post(signupValidator(), validator, registerSeller);
router.route("/login").post(loginValidator(), validator, loginSeller);

// secure routes
router
  .route("/add-address")
  .post(jwtValidator, addressValidator(), validator, addBusinessAddress);
router
  .route("/add-business")
  .post(jwtValidator, businessRegisterValidator(), validator, registerBusiness);

// export
export default router;
