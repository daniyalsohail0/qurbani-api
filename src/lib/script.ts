import * as XLSX from "xlsx";
import Customer from "../models/customer";
import connectToDatabase from "./db";
import Assignment from "../models/assignment";
import mongoose from "mongoose";
import { Assignment as IAssignment } from "../types/assignment";

interface ExcelRow {
  SR: string;
  Contact_Reference_ID: string;
  Stage: string;
  Transaction_ID: string;
  Donation_Date: string;
  Donation_Source: string;
  Salutation: string;
  Primary_Contact: string;
  Project_Country: string;
  Amount: string;
  Comments: string;
  Calculated_Quantity: string;
  Total_Price2: string;
  Project_Name: string;
  Size: string;
  Quantity: string;
  Total_Price: string;
  Distribute: string;
  Region: string;
  Type: string;
  Animal: string;
  Country: string;
  Donation_Owner_Department: string;
  Donation_Owner_Division: string;
  Mailing_Address_Line_1: string;
  Mailing_Address_Line_2: string;
  Mailing_Address_Line_3: string;
  Mailing_City: string;
  Mailing_State_Province: string;
  Mailing_Zip_Postal_Code: string;
  Mailing_Country: string;
  Donation_Time: string;
  Contact_Phone: string;
  Contact_Email: string;
  name_plate: string;
  Notes: string;
}

async function runScript(): Promise<void> {
  try {
    await connectToDatabase();

    console.log("Script is running...");

    const workbook = XLSX.readFile("./gaza-data.csv");
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json<ExcelRow>(worksheet);

    for (let i = 0; i < data.length; i++) {
      if(!data[i].Contact_Email) {
        console.log(`Skipping row ${i + 1} ${data[i].Transaction_ID} due to missing Contact_Email.`);
        continue;
      }


      let customer = await Customer.findOne({
        transactionId: data[i].Transaction_ID,
      });

      if (!customer) {
        console.log("Transaction ID not found.");

        customer = await Customer.create({
          email: data[i].Contact_Email,
          salutation: data[i].Salutation,
          name: data[i].Primary_Contact,
          address1: data[i].Mailing_Address_Line_1
            ? data[i].Mailing_Address_Line_1
            : "",
          address2: data[i].Mailing_Address_Line_2
            ? data[i].Mailing_Address_Line_2
            : "",
          address3: data[i].Mailing_Address_Line_3
            ? data[i].Mailing_Address_Line_3
            : "",
          city: data[i].Mailing_City,
          county: data[i].Mailing_State_Province,
          country: data[i].Mailing_Country,
          postCode: data[i].Mailing_Zip_Postal_Code,
          transactionId: data[i].Transaction_ID,
        });

        for (let j = 0; j < Number(data[i].Quantity); j++) {
          const assignment: IAssignment = await Assignment.create({
            title: data[i].Project_Name,
            price: Number(data[i].Total_Price) / Number(data[i].Quantity),
            quantity: 1,
            country: data[i].Country,
            region: data[i].Region,
            animal: data[i].Animal,
            size: data[i].Size,
            category: data[i].Distribute,
            namePlate: data[i].name_plate,
            status: "pending",
            customerId: customer?.id,
          });

          customer.assignments?.push(
            new mongoose.Types.ObjectId(assignment._id)
          );
        }
      } else {
        for (let j = 0; j < Number(data[i].Quantity); j++) {
          const assignment: IAssignment = await Assignment.create({
            title: data[i].Project_Name,
            price: Number(data[i].Total_Price) / Number(data[i].Quantity),
            quantity: 1,
            country: data[i].Country,
            region: data[i].Region,
            animal: data[i].Animal,
            size: data[i].Size,
            category: data[i].Distribute,
            namePlate: data[i].name_plate,
            status: "pending",
            customerId: customer?.id,
          });

          customer.assignments?.push(
            new mongoose.Types.ObjectId(assignment._id)
          );
        }
      }

      customer.save();
    }

    console.log("Script completed successfully.");
    return;
  } catch (error) {
    console.error("An error occurred while running the script:", error);
  }
}

runScript();
