import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    region: { type: String, required: true },
    role: { type: String, required: true },
    assignments: { type: [mongoose.Types.ObjectId], ref: "assignments" },
  },
  { timestamps: true }
);

const User = model("users", userSchema);

export default User;
