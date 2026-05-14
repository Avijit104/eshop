import { Router } from "express";

// middleware
import { jwtValidator } from "../../middleware/jwtValidator.middle.js";
import { validator } from "../../middleware/validator.middle.js";

// controllers
import {
  getUser,
  changePassword,
  updateEmail,
  updateName,
  updatePhno,
} from "../../controllers/customer/user.controllers.js";

// validators
import {
  updateEmailValidator,
  updatePhnoValidator,
  updateUserNameValidator,
  changePasswordValidator,
} from "../../validators/customer/user.validator.js";

const router = Router();

// secure routes
router.route("/").get(jwtValidator, getUser);

router
  .route("/change-password")
  .put(jwtValidator, changePasswordValidator(), validator, changePassword);

router
  .route("/update/name")
  .put(jwtValidator, updateUserNameValidator(), validator, updateName);

router
  .route("/update/email")
  .put(jwtValidator, updateEmailValidator(), validator, updateEmail);

router
  .route("/update/phno")
  .put(jwtValidator, updatePhnoValidator(), validator, updatePhno);

// export router
export default router;
