import User from "../models/UserModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import loginwithToken from "../utils/loginwithToken.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res, next) => {
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);
  const { name, email, password } = req.body;
  const avatarLocalPath = req.file.path;

  const cloudResponse = await uploadOnCloudinary('avatar', avatarLocalPath);
  // console.log(cloudResponse);
  const userData = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: cloudResponse.public_id,
      url: cloudResponse.secure_url,
    },
  });
  //  Login after registering
  loginwithToken(userData, res, "User Created Successfully");
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApiError(401, "Email or Password is empty"));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ApiError(404, "User doesn't Exist"));
  }
  const isPassMatched = await user.comparePassword(password);
  // const isPassMatched = user.password === password;
  // console.log(password);
  // console.log(user.password);

  if (!isPassMatched) {
    return next(new ApiError(403, "Invalid User Credentials!"));
  }

  loginwithToken(user, res, "User LoggedIn sucessfully");
});

const logoutUser = asyncHandler(async (req, res, next) => {
  const options = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };
  res.cookie("token", null, options);

  res.status(201).json(new ApiResponse(200, {}, `User logged Out succesfully`));
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError(404, "User not found "));
  }
  // get password token
  const resetToken = await user.getResetPasswordToken();
  // saving user with token and its expiry
  await user.save({ validateBeforeSave: false });

  const frontHost = `${req.get("host").split(":")[0]}:${process.env.FRONT_PORT}`;
  const resetUrl = `${req.protocol}://${frontHost}/password/reset/${resetToken}`;
  const message = `Your reset Password Link is :-\n ${resetUrl} \n If you have not requested this please ignore`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Anshu Password Recovery",
      message: message,
    });

    res
      .status(200)
      .json(new ApiResponse(201, `Email Sent to ${user.email} successfully`));
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ApiError(500, error.message));
  }
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError(400, "Token is Invalid or Expired "));
  }

  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;
  if (newPassword !== confirmPassword) {
    return next(new ApiError(400, "Password doesnot Match"));
  }
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpiry = undefined;

  await user.save();

  loginwithToken(user, res, "Logged In & Password changed Successfully");
});

const getUserDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json(new ApiResponse(201, user));
});

const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;

  const isPassMatched = await user.comparePassword(oldPassword);
  if (!isPassMatched) {
    return next(new ApiError(400, "Old Password is Incorrect!"));
  }
  
  if (newPassword !== confirmPassword) {
    return next(new ApiError(401, "Both Passwords are different"));
  }
  user.password = newPassword;

  await user.save();

  loginwithToken(user, res, "Logged In & Password Updated Successfully");
});

// update profile
const updateProfile = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;
  const isEmailAlreadyUsed = await User.findOne({ email: email });
  if (isEmailAlreadyUsed) {
    return next(new ApiError(400, `Email ${email} already in use`));
  }

  const avatarLocalPath = req.file?.path;
  console.log(avatarLocalPath)
  let newUserData = { name, email };

  if (avatarLocalPath) {
    const cloudResponse = await uploadOnCloudinary('avatar',avatarLocalPath);
    console.log(cloudResponse)
    newUserData.avatar = {
      public_id: cloudResponse.public_id,
      url: cloudResponse.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res
    .status(200)
    .json(new ApiResponse(201, user, "Profile Updated Successfully"));
});


// admin to get alluser
const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(new ApiResponse(201, users));
});
const getSingleUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ApiError(404, `User not found with id ${req.params.id}`));
  }

  res.status(200).json(new ApiResponse(201, user));
});

// update role --admin
const updateProfileRole = asyncHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) {
    return next(new ApiError(400, `User not found with ${req.params.id}`));
  }

  res
    .status(200)
    .json(new ApiResponse(201, user, "Profile Updated Successfully"));
});

// Delete User --admin
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  // Remove cloudinary
  if (!user) {
    return next(new ApiError(400, `User not found with ${req.params.id}`));
  }
  if (user.role === 'admin') {
    return next(new ApiError(400, `You cant delete a admin directly`));
  }
  await user.deleteOne();
  res.status(200).json(new ApiResponse(201, user, "User deleted Successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateProfileRole,
};
