import { Router } from "express";

// middlewares
import { validator } from "../../middleware/validator.middle.js";
import { jwtValidator } from "../../middleware/jwtValidator.middle.js";

// controllers
import {
  getAllUserBusiness,
  getBusiness,
  editBusiness,
  editBusinessAddress,
  removeBusiness,
} from "../../controllers/business/business.controllers.js";

// validators
import {
  ediBusinessAddressValidator,
  editBusinessValidator,
} from "../../validators/seller/business.validator.js";

const router = Router();

// secure routes
router.route("/").get(jwtValidator, getAllUserBusiness);

router
  .route("/:businessId")
  .put(jwtValidator, editBusinessValidator(), validator, editBusiness)
  .get(jwtValidator, getBusiness)
  .delete(jwtValidator, removeBusiness);

router
  .route("/edit/address")
  .put(
    jwtValidator,
    ediBusinessAddressValidator(),
    validator,
    editBusinessAddress,
  );

// export
export default router;
