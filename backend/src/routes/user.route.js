import { Router } from "express";
import { signup } from "../controllers/user.controllers.js";
import { validator } from "../middleware/validator.middle.js";
import { signupValidator } from "../validators/user.validator.js";

const router = Router();

router.route("/signup").post(signupValidator(), validator, signup);

export default router;
