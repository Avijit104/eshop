import { Router } from "express";
import { jwtValidator } from "../middleware/jwtValidator.middle.js";
import { validator } from "../middleware/validator.middle.js";

import {
  getUser,
  editUsername,
  changePassword,
  verifyEmail,
  sendVerifyEmail,
} from "../controllers/user.controllers.js";

import {
  editUsernameValidator,
  changePasswordValidator,
} from "../validators/user.validator.js";

const router = Router();

// secure routes
router.route("/").get(jwtValidator, getUser);

router
  .route("/edit-username")
  .put(jwtValidator, editUsernameValidator(), validator, editUsername);

router
  .route("/change-password")
  .put(jwtValidator, changePasswordValidator(), validator, changePassword);

router.route("/email-mail").get(jwtValidator, sendVerifyEmail);
router.route("/verify-email/:unHasedToken").get(jwtValidator, verifyEmail);

// export router
export default router;
