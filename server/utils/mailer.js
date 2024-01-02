require("dotenv").config(); // Load environment variables from .env file

const nodemailer = require("nodemailer");
const { google } = require("googleapis");

async function sendMail(receiverEmail, inventoryItem) {
  try {
    // Create a new OAuth2 client
    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );

    // Set the refresh token
    oAuth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken = await oAuth2Client.getAccessToken();

    // Create a nodemailer transport object
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.SENDER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    // Create a mail object
    const mailOptions = {
      from: process.env.EMAIL,
      to: receiverEmail,
      subject: "Inventory Management System - Item Restocked",
      html: `
        <p>Hi there,</p>
        <p>The following inventory item has been restocked:</p>
        <ul>
          <li>Name: ${inventoryItem.name}</li>
          <li>Quantity: ${inventoryItem.quantity}</li>
        </ul>
        <p>Regards,</p>
        <p>Inventory Management System</p>
        `,
    };

    // Send mail
    const result = await transporter.sendMail(mailOptions);
  } catch (error) {
    // Show error message
    console.error("Error sending email:", error);
  }
}

module.exports = sendMail;
