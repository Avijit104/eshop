import { Router } from "express";
import { jwtValidator } from "../middleware/jwtValidator.middle.js";
import { validator } from "../middleware/validator.middle.js";

import {
  getUser,
  editUsername,
  changePassword,
  updateUser,
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

router.route("/update").put(jwtValidator, updateUser);

// export router
export default router;
