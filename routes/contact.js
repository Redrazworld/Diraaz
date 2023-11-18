const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");
const db = require("../db");
const requireLogin = require("../middleware/requireLogin");
const router = express.Router();

router.post("/api/contact", async (req, res) => {
  try {
    const { fullName, email, phone, country, message } = req.body;

    // Save the contact form data to your database (you can adjust this based on your database schema)
    const saveContactQuery =
      "INSERT INTO contacts (name, email, phone, country, message,responsed) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      saveContactQuery,
      [fullName, email, phone, country, message, 0],
      (dbError, dbResults) => {
        if (dbError) {
          console.error(
            "Error saving contact form data to the database:",
            dbError
          );
          return res
            .status(500)
            .json({ error: "Failed to save contact form data" });
        }

        // Email message content
        const subject = "New Contact Form Submission";
        const mailBody = `
          New contact form submission:
  
          Name: ${fullName}
          Email: ${email}
          Phone: ${phone}
          Country: ${country}
          Message: ${message}
        `;

        // Create a Nodemailer transporter
        let transporter = nodemailer.createTransport({
          service: "Gmail", // Replace with your email service
          auth: {
            user: process.env.EMAIL, // Replace with your own email address
            pass: process.env.EMAIL_PASSWORD, // Replace with your own email password
          },
        });

        // Set up email data
        let mailOptions = {
          from: `"DIRAAZ Contact Form" <${process.env.EMAIL}>`,
          to: email, // Replace with your notification email address
          subject: subject,
          text: mailBody,
        };

        // Send the email notification
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Failed to send email notification:", error);
            return res
              .status(500)
              .json({ error: "Failed to send email notification" });
          }

          console.log("Email notification sent: %s", info.messageId);
          res
            .status(200)
            .json({ message: "Contact form submitted successfully" });
        });
      }
    );
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
