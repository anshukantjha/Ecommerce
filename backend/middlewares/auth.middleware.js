import User from "../models/UserModel.js";
import { ApiError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const isUserAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token);

  if (!token) {
    return next(new ApiError(401, "Login to get Acess"));
  }
  const decodedData = jwt.verify(token, process.env.JWT_TOKEN);
  // console.log(decodedData)
  req.user = await User.findById(decodedData.id);
  next();
});

const isRolesAuthorised = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      // if not admin
      return next(
        new ApiError(
          403,
          `Role:${req.user.role} is not allowed to access this resource`
        )
      );
    }
    next();
  };
};

export { isUserAuthenticated, isRolesAuthorised };
