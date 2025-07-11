import { Schema, model } from "mongoose";
import { Assignment } from "../types/assignment";

const assignmentSchema = new Schema<Assignment>(
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
    namePlate: { type: String },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    customerId: {
      type: Schema.ObjectId,
      ref: "customers",
      required: true,
    },
  },
  { timestamps: true }
);

const Assignment = model("assignments", assignmentSchema);

export default Assignment;
