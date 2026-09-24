import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: {
      type: Array,
      required: true,
      min: 1,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    address: {
      type: Object,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "stripe", "razor-pay"],
      default: "cod",
    },
    payment: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Order Placed", "Packing", "Shipped", "Out for delivery", "Delivered", "Cancelled"],
      default: "Order Placed",
    },
  },
  { timestamps: true },
);

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;