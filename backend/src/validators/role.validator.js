import { body } from "express-validator";
import { availableRole } from "../utils/constants.js";

const roleValidator = () => {
  return [
    body("role")
      .optional()
      .trim()
      .isIn(availableRole)
      .withMessage("invalid role"),
    body("pan")
      .trim()
      .custom((value, { req }) => {
        if (req.body.role === "seller") {
          if (!value || value.trim() === "") {
            throw new Error("PAN is required for seller role");
          }
        }
        return true;
      })
      .optional(),
  ];
};

export { roleValidator };
