import { Schema, model } from "mongoose";

const customerSchema = new Schema(
  {
    email: { type: String },
    salutation: { type: String },
    name: { type: String },
    address1: { type: String },
    address2: { type: String },
    address3: { type: String },
    city: { type: String },
    county: { type: String },
    postCode: { type: String },
    country: { type: String },
    namePlate: { type: String },
    assignments: [{ type: Schema.Types.ObjectId, ref: "assignments" }],
    transactionId: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

const Customer = model("customers", customerSchema);

export default Customer;
