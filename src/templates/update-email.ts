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
        <li><strong>Country:</strong> ${country}</li>
        <li><strong>Region:</strong> ${region}</li>
        <li><strong>Order ID:</strong> ${customerId}</li>
        <li><strong>Transaction ID:</strong> ${transactionId}</li>
      </ul>
      
      <p>You can view your updated Qurbani details by clicking the button below:</p>
      
      <p>
        <a href="${process.env.FRONTEND_URL}/qurbani/orders/assignment?assignmentId=${assignmentId}"
           style="display: inline-block; padding: 10px 20px; background-color: #223f81; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
          View Qurbani Details
        </a>
      </p>

      <hr style="margin: 30px 0;" />

      <h3 style="color: #223F81;">Qurbani Track & Trace – Pilot Disclaimer</h3>
      <p>Dear Donor,</p>
      <p>This year, we are excited to introduce a pilot version of our Qurbani Track & Trace system – a new initiative designed to enhance transparency by sharing photos and videos of your Qurbani animal throughout the process.</p>
      <p>As this is our first year rolling out this system, we kindly ask for your patience and understanding. While we aim to provide regular updates, please note:</p>
      <ul>
        <li>This feature is currently optional and offered as an added value, not a guaranteed part of the Qurbani process.</li>
        <li>Technical or logistical challenges may occasionally limit our ability to provide full media coverage for every donor.</li>
        <li>The Qurbani itself will be carried out with full care and in accordance with Islamic guidelines, regardless of media updates.</li>
      </ul>
      <p>We deeply appreciate your support and are grateful for your trust as we strive to make this service more robust in the years ahead.</p>
      <p>Thank you for being part of this journey.</p>
      
      <p>Warm regards,<br/>The Al Khair Foundation Team</p>
    </div>
  `;
}
