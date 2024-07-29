import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name!"],
    },
    description: {
      type: String,
      required: [true, "Please Enter description"],
    },
    price: {
      type: Number,
      required: [true, "Price is a required field"],
      maxLength: [8, "price cannot exceed 8 digits"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please enter product Category"],
    },
    stock: {
      type: Number,
      required: [true, "Please Enter product stock"],
      maxLength: [4, "stock can't exceed 4"],
      default: 0,
    },
    noOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
