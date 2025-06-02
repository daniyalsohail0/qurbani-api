import { Customer } from "../types/customer";
import { Assignment } from "../types/assignment";

export function generateOrderEmail(
  customer: Customer,
  assignments: Assignment[]
): string {
  const customerName = customer.name || "Donor";

  const rows = assignments
    .map((a, index) => {
      return `
        <tr>
          <td style="border: 1px solid #ccc; padding: 8px;">${index + 1}</td>
          <td style="border: 1px solid #ccc; padding: 8px;">${a.title}</td>
          <td style="border: 1px solid #ccc; padding: 8px;">${a.quantity}</td>
          <td style="border: 1px solid #ccc; padding: 8px;">£${a.price.toFixed(
            2
          )}</td>
          <td style="border: 1px solid #ccc; padding: 8px;">${a.country}</td>
          <td style="border: 1px solid #ccc; padding: 8px;">${a.region}</td>
          <td style="border: 1px solid #ccc; padding: 8px;">${
            a.animal || "-"
          }</td>
          <td style="border: 1px solid #ccc; padding: 8px;">${
            a.size || "-"
          }</td>
          <td style="border: 1px solid #ccc; padding: 8px;">${
            a.category || "-"
          }</td>
          <td style="border: 1px solid #ccc; padding: 8px;">${a.status}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #223F81;">Al Khair Foundation - Qurbani Order Summary</h2>
      <p>Dear ${customerName},</p>
      <p>Thank you for your Qurbani order. Please find below a summary of your assignments:</p>

      <table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="border: 1px solid #ccc; padding: 8px;">#</th>
            <th style="border: 1px solid #ccc; padding: 8px;">Title</th>
            <th style="border: 1px solid #ccc; padding: 8px;">Qty</th>
            <th style="border: 1px solid #ccc; padding: 8px;">Price</th>
            <th style="border: 1px solid #ccc; padding: 8px;">Country</th>
            <th style="border: 1px solid #ccc; padding: 8px;">Region</th>
            <th style="border: 1px solid #ccc; padding: 8px;">Animal</th>
            <th style="border: 1px solid #ccc; padding: 8px;">Size</th>
            <th style="border: 1px solid #ccc; padding: 8px;">Category</th>
            <th style="border: 1px solid #ccc; padding: 8px;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>

      <p>
        <a href="${
          process.env.FRONTEND_URL
        }/qurbani/orders?orderId=${customer._id}"
           style="display: inline-block; padding: 10px 20px; background-color: #223f81; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Track Your Qurbani
        </a>
      </p>

      <p style="margin-top: 20px;">If you have any questions, please do not hesitate to contact us.</p>
      <p>JazakAllah Khair,<br />The Al Khair Foundation Team</p>
    </div>
  `;
}
