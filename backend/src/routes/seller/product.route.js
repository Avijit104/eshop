import { Router } from "express";

// middlewares
import { jwtValidator } from "../../middleware/jwtValidator.middle.js";
import { validator } from "../../middleware/validator.middle.js";

// controllers
import {
  addProduct,
  getAllUserProducts,
  getBusinessProducts,
  editProduct,
  deleteProduct,
  addDiscount,
} from "../../controllers/business/product.controllers.js";

// validators
import {
  productValidator,
  prooductEditValidator,
  discountValidaor,
} from "../../validators/seller/product.validator.js";

const router = Router();

// secure routes
router
  .route("/add-product")
  .post(jwtValidator, productValidator(), validator, addProduct);
router.route("/").get(jwtValidator, getAllUserProducts);
router.route("/:businessId").get(jwtValidator, getBusinessProducts);
router
  .route("/edit/:productId")
  .put(jwtValidator, prooductEditValidator(), validator, editProduct);
router.route("/delete/:productId").delete(jwtValidator, deleteProduct);
router
  .route("/discount/:productId")
  .put(jwtValidator, discountValidaor(), validator, addDiscount);

export default router;
