// pages/api/forgotPassword.js
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    // Generate a unique token here (You can use packages like `crypto` or `uuid`)
    const resetToken = generateResetToken();

    // Send email with reset link
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail", // e.g., Gmail
        auth: {
          user: process.env.MY_EMAIL,
          pass: process.env.MY_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.MY_EMAIL,
        to: email,
        subject: "Password Reset",
        text: `Click this link to reset your password: http://yourwebsite.com/resetPassword?token=${resetToken}`,
      };

      await transporter.sendMail(mailOptions);
      res
        .status(200)
        .json({ message: "Password reset email sent successfully." });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send password reset email." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

function generateResetToken() {
  // Your token generation logic here
  return crypto.randomBytes(20).toString("hex");
}
