import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the Name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the Email"],
      unique: true,
      validate: [validator.isEmail, "Please enter valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please enter the Password"],
      select: false,
      minLength: [8, "Password should have minimum 8 characters"],
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiry: Date,
  },
  { timestamps: true }
);

// salting of password
usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// generating token
usersSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

// verifying password
usersSchema.methods.comparePassword = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

usersSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordTokenExpiry = Date.now() + 30 * 60 * 1000;
  return resetToken;
};
const User = mongoose.model("User", usersSchema);
export default User;
