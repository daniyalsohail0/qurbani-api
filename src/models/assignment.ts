import { Schema, model } from "mongoose";

const assignmentSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    country: { type: String, required: true },
    region: { type: String, required: true },
    animal: { type: String },
    size: { type: String },
    category: { type: String },
    video: { type: String },
    images: { type: [String] },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "customers",
      required: true,
    },
  },
  { timestamps: true }
);

const Assignment = model("assignments", assignmentSchema);

export default Assignment;
