import { Router } from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAdminProducts,
  getAllProducts,
  getAllReviews,
  getProductDetails,
  updateProduct,

} from "../controllers/product.controller.js";
import {
  isUserAuthenticated,
  isRolesAuthorised,
} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router
  .route("/products")
  .get(getAllProducts);

router
  .route("/admin/products")
  .get(isUserAuthenticated, isRolesAuthorised("admin"), getAdminProducts);

router
  .route("/admin/products/new")
  .post(isUserAuthenticated, isRolesAuthorised("admin"),upload.array('images',5), createProduct);

router
  .route("/admin/products/:id")
  .put(isUserAuthenticated, isRolesAuthorised("admin"),upload.array('images',5), updateProduct)
  .delete(isUserAuthenticated, isRolesAuthorised("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isUserAuthenticated, createProductReview);

router.route("/reviews").get(getAllReviews).delete(isUserAuthenticated, deleteReview)

export default router;
