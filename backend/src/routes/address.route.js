import { Router } from "express";

// middleware
import { jwtValidator } from "../middleware/jwtValidator.middle.js";
import { validator } from "../middleware/validator.middle.js";

// controllers
import {
  addAddress,
  getAllAddress,
  deleteAddress,
  editAddress,
} from "../controllers/address.controllers.js";

// validators
import { addressValidator } from "../validators/address.validator.js";

// router
const router = Router();

// secure routes
router.route("/").get(jwtValidator, getAllAddress);

router
  .route("/add-address")
  .post(jwtValidator, addressValidator(), validator, addAddress);

router
  .route("/edit-address/:id")
  .put(jwtValidator, addressValidator(), validator, editAddress);

router.route("/delete-address/:id").get(jwtValidator, deleteAddress);

// export router
export default router;
