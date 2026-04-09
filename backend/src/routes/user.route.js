import { Router } from "express";
import { signup, login, getUser } from "../controllers/user.controllers.js";
import { validator } from "../middleware/validator.middle.js";
import {
  signupValidator,
  loginValidator,
} from "../validators/user.validator.js";
import { jwtValidator } from "../middleware/jwtValidator.middle.js";

const router = Router();

router.route("/signup").post(signupValidator(), validator, signup);
router.route("/login").post(loginValidator(), validator, login);
router.route("/").get(jwtValidator, getUser);

export default router;
