import { Router } from "express";

// middleware
import { jwtValidator } from "../../middleware/jwtValidator.middle.js";
import { validator } from "../../middleware/validator.middle.js";

// controllers
import {
  registerBusiness,
  registerSeller,
  addBusinessAddress,
} from "../../controllers/business/auth.controller.js";

// validator
import {
  signupValidator,
  loginValidator,
} from "../../validators/customer/auth.validator.js";
import { roleValidator } from "../../validators/user/role.validator.js";
import { addressValidator } from "../../validators/customer/address.validator.js";
import { businessRegisterValidator } from "../../validators/seller/business.validator.js";

const router = Router();

// unsecure routes
router
  .route("/signup")
  .post(
    signupValidator(),
    validator,
    roleValidator(),
    validator,
    registerSeller,
  );

// secure routes
router
  .route("/add-address")
  .post(jwtValidator, addressValidator(), validator, addBusinessAddress);
router
  .route("/add-business")
  .post(jwtValidator, businessRegisterValidator(), validator, registerBusiness);

// export
export default router;
