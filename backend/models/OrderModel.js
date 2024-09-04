import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
        default: "India",
      },
      pinCode: {
        type: Number,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
    },

    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    paymentInfo: {
      id: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      paidAt: {
        type: Date,
        required: true,
      },
    },
    prices: {
      itemPrice: {
        type: Number,
        required: true,
      },
      taxPrice: {
        type: Number,
        required: true,
      },
      shippingPrice: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
    orderStatus: {
      type: String,
      required: true,
      default: "Processing",
    },
    deliveredOn: Date,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
