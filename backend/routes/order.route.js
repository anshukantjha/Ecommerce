import { Router } from "express";

import {
  getAllOrders,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";
import {
  isUserAuthenticated,
  isRolesAuthorised,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/order/new").post(isUserAuthenticated, newOrder);
router.route("/order/:id").get(isUserAuthenticated, getSingleOrder);
router.route("/me/orders").get(isUserAuthenticated, myOrders);

router
  .route("/admin/orders")
  // .get(isUserAuthenticated, isRolesAuthorised("admin"), getAllOrders);
  .get(isUserAuthenticated, getAllOrders);
router
  .route("/admin/order/:id")
  .put(isUserAuthenticated, isRolesAuthorised("admin"), updateOrder)
  .delete(isUserAuthenticated, isRolesAuthorised("admin"), deleteOrder);

export default router;
