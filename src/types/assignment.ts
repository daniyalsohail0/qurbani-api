import { Document, Types } from "mongoose";

export interface Assignment extends Document {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  country: string;
  region: string;
  animal?: string;
  size?: string;
  category?: string;
  video?: string;
  images?: string[];
  namePlate?: string;
  status: "pending" | "completed";
  customerId: Types.ObjectId;
}
