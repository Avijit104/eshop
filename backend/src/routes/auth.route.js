// router
import { Router } from "express";

// middlewares
import { validator } from "../middleware/validator.middle.js";
import { jwtValidator } from "../middleware/jwtValidator.middle.js";

// controllers
import { signup, login, logout } from "../controllers/auth.controllers.js";

// validators
import {
  signupValidator,
  loginValidator,
} from "../validators/auth.validator.js";

// router initialization
const router = Router();

// unsecured routes
router.route("/signup").post(signupValidator(), validator, signup);

router.route("/login").post(loginValidator(), validator, login);

// secure routes

router.route("/logout").get(jwtValidator, logout);

// export
export default router;
