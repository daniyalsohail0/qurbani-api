import { Schema, model } from "mongoose";
import { Customer } from "../types/customer";
import { Model } from "mongoose";

const customerSchema = new Schema<Customer>(
  {
    email: { type: String, required: true },
    salutation: { type: String },
    name: { type: String, required: true },
    address1: { type: String },
    address2: { type: String },
    address3: { type: String },
    city: { type: String },
    county: { type: String },
    postCode: { type: String },
    country: { type: String },
    namePlate: { type: String },
    assignments: [
      { type: Schema.ObjectId, ref: "assignments", default: [] },
    ],
    transactionId: { type: String, unique: true, required: true },
    orderEmail: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Customer: Model<Customer> = model<Customer>("customers", customerSchema);

export default Customer;
