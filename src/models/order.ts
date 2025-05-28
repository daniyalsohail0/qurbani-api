import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    customer: { type: mongoose.Types.ObjectId },
    assignments: { type: [mongoose.Types.ObjectId] },
  },
  { timestamps: true }
);

const Order = mongoose.model("orders", orderSchema);

export default Order;
