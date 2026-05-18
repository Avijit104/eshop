import { Router } from "express";

import {
  getAllUserBusiness,
  getBusiness,
  editBusiness,
  editBusinessAddress,
  removeBusiness,
} from "../../controllers/business/business.controllers.js";

import {
  ediBusinesstAddressValidator,
  editBusinessValidator,
} from "../../validators/seller/business.validator.js";

import { validator } from "../../middleware/validator.middle.js";
import { jwtValidator } from "../../middleware/jwtValidator.middle.js";

const router = Router();

router.route("/").get(jwtValidator, getAllUserBusiness);
router
  .route("/:businessId")
  .put(jwtValidator, editBusinessValidator(), validator, editBusiness)
  .get(jwtValidator, getBusiness)
  .delete(jwtValidator, removeBusiness);

router
  .route("/edit-address/:addressId")
  .put(
    jwtValidator,
    ediBusinesstAddressValidator(),
    validator,
    editBusinessAddress,
  );
export default router;
