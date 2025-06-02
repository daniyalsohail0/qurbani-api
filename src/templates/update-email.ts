export function updateEmailTemplate(
  customerName: string,
  customerId: string,
  assignmentId: string,
  title: string,
  price: number,
  transactionId: string,
  quantity: number,
  country: string,
  region: string,
  animal?: string,
  size?: string
): string {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #223F81; font-weight:bold;">Al Khair Foundation</h2>
      <p>Dear ${customerName},</p>
      
      <p>Thank you for your generous Qurbani donation. We are pleased to inform you that your order has been successfully updated.</p>
      
      <p><strong>Donation Summary:</strong></p>
      <ul>
        <li><strong>Title:</strong> ${title}</li>
        <li><strong>Quantity:</strong> ${quantity}</li>
        <li><strong>Animal:</strong> ${animal || "N/A"}</li>
        <li><strong>Size:</strong> ${size || "N/A"}</li>
        <li><strong>Country:</strong> ${country}</li>
        <li><strong>Region:</strong> ${region}</li>
        <li><strong>Price:</strong> £${price.toFixed(2)}</li>
        <li><strong>Order ID:</strong> ${customerId}</li>
        <li><strong>Transaction ID:</strong> ${transactionId}</li>
      </ul>
      
      <p>You can view your updated Qurbani details by clicking the button below:</p>
      
      <p>
        <a href="${
          process.env.FRONTEND_URL
        }/qurbani/orders/assignment?assignmentId=${assignmentId}"
           style="display: inline-block; padding: 10px 20px; background-color: #223f81; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
          View Qurbani Details
        </a>
      </p>
      
      <p>We sincerely thank you for your support. Your Qurbani is making a meaningful impact.</p>
      
      <p>Warm regards,<br/>The Al Khair Foundation Team</p>
    </div>
  `;
}
