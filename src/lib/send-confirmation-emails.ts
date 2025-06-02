import Customer from "../models/customer";
import { generateOrderEmail } from "../templates/order-email";
import { Assignment } from "../types/assignment";
import connectToDatabase from "./db";
import sendEmail from "./sendgrid";
import "../models/assignment";

async function sendConfirmationEmails(): Promise<void> {
  try {
    await connectToDatabase();

    const customers = await Customer.find({ orderEmail: false });

    if (customers.length === 0) {
      console.log("No customers found.");
      return;
    }

    for (let i = 0; i < customers.length; i++) {
      const customer = await Customer.findById(customers[i]._id).populate(
        "assignments"
      );

      if (!customer) {
        continue;
      }

      if (!customer.email) {
        console.log(`Customer with ID ${customer._id} has no email address.`);
        continue;
      }

      if (customer.orderEmail) {
        console.log(
          `Order email already sent to ${customer.email}. Skipping...`
        );
        continue;
      }

      await sendEmail({
        to: customer.email,
        subject: "Order Confirmation",
        html: generateOrderEmail(customer, customer.assignments as Assignment[]),
      });

      customer.orderEmail = true;
      await customer.save();
    }
  } catch (error) {
    console.error("Error sending confirmation emails:", error);
    throw error;
  }
}

sendConfirmationEmails();
