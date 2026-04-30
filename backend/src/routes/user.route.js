import { Router } from "express";
import { jwtValidator } from "../middleware/jwtValidator.middle.js";
import { validator } from "../middleware/validator.middle.js";

import {
  getUser,
  editUsername,
  changePassword,
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

// export router
export default router;
