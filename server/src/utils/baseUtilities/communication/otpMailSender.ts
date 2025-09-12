import nodemailer from "nodemailer";
import logger from "../messages/logger";

export const sendVerificationEmail = async (email: string, otp: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Festiva" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Your OTP Code for Festiva",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h1 style="color: #4a6baf;">Welcome to Festiva!</h1>
        <p>Your OTP code is: <strong>${otp}</strong></p>
        <p>This code expires in 2 minutes.</p>
      </div>
    `,
    });
  } catch (error) {
    logger.error("Error sending email:", error);
    throw error;
  }
};
