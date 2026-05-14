import { Router } from "express";

// controllers
import { healthCheck } from "../controllers/healthCheck.controllers.js";

// router
const router = Router();

// unsecure routes
router.route("/").get(healthCheck);

export default router;
