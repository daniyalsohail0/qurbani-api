import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API as string);

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  fromName?: string;
  fromEmail?: string;
}

const sendEmail = async ({
  to,
  subject,
  html,
  fromName = "Al Khair Foundation",
  fromEmail = "donations@donation-alkhair.co.uk",
}: EmailOptions): Promise<void> => {
  const message = {
    to,
    from: {
      name: fromName,
      email: fromEmail,
    },
    subject,
    html,
  };

  console.log("sendEmail executed.");

  try {
    const response = await sgMail.send(message);
    console.log("Email sent successfully:", response[0].statusCode);
  } catch (error: any) {
    console.log("Error sending email:", error.response?.body || error, {
      depth: null,
    });
  }
};

export default sendEmail;
