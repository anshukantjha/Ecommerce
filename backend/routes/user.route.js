import { Router } from "express";

import {
  loginUser,
  logoutUser,
  registerUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateProfileRole,
  deleteUser,
} from "../controllers/user.controller.js";
import {
  isUserAuthenticated,
  isRolesAuthorised,
} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(upload.single('avatar') ,registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);
router.route("/me").get(isUserAuthenticated, getUserDetails);
router.route("/password/update").put(isUserAuthenticated, updatePassword);
router.route("/me/update").put(isUserAuthenticated,upload.single('avatar'), updateProfile);

router
  .route("/admin/users")
  .get(isUserAuthenticated, isRolesAuthorised("admin"), getAllUsers);
  // .get(isUserAuthenticated, getAllUsers);
router
  .route("/admin/user/:id")
  .get(isUserAuthenticated, isRolesAuthorised("admin"), getSingleUser)
  .put(isUserAuthenticated, isRolesAuthorised("admin"), updateProfileRole)
  .delete(isUserAuthenticated, isRolesAuthorised("admin"), deleteUser);

export default router;
