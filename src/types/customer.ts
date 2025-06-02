import { Document, Types } from "mongoose";
import { Assignment } from "./assignment";

export interface Customer extends Document {
  _id: string;
  email: string;
  salutation?: string;
  name?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  city?: string;
  county?: string;
  postCode?: string;
  country?: string;
  namePlate?: string;
  assignments?: (Types.ObjectId | Assignment)[];
  transactionId: string;
  orderEmail?: boolean;
}
