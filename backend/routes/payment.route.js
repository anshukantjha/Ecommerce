import { Router } from "express";

import { isUserAuthenticated } from "../middlewares/auth.middleware.js";
import { processPayment, sendStripeApiKey } from "../controllers/payment.controller.js";

const router = Router();

router.route("/payment/process").post(isUserAuthenticated, processPayment);

router.route("/stripeapikey").get(isUserAuthenticated, sendStripeApiKey);

export default router


