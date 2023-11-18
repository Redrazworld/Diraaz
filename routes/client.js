const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const nodemailer = require('nodemailer');
const db = require('../db');
const requireLogin = require('../middleware/requireLogin');
const router = express.Router();


router.post('/api/verify/user/email', async (req, res) => {
  const { email, name } = req.body;

  // Check if the email is already registered in your MySQL database
  const query = 'SELECT * FROM clients WHERE email = ?';
  db.query(query, [email], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ' + error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Generate a random OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Email message content
    const subject = 'Your One-Time Password (OTP) for Verification';
    const message = `Dear ${name},
    
    Thank you for choosing our platform. As part of the registration process, we require you to verify your account using a One-Time Password (OTP). Please find your OTP below:
    
    OTP: ${otp}
    
    Please enter this OTP in the designated field to complete your account verification. Please note that the OTP is valid for a limited time and should be kept confidential. Do not share this OTP with anyone.
    
    If you did not initiate this registration process or have any concerns, please disregard this email.
    
    Thank you for your cooperation.
    
    Best regards,
    DIRAAZ`;

    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL, // Replace with your own email address
        pass: process.env.EMAIL_PASSWORD, // Replace with your own email password
      },
    });

    // Set up email data
    let mailOptions = {
      from: `"DIRAAZ" <${process.env.EMAIL}>`,
      to: email,
      subject: subject,
      text: message,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to send email' });
      }
      console.log('Email sent: %s', info.messageId);
      res.status(200).json({ message: 'Email sent successfully', otp: otp });
    });
  });
});
// Signup route
router.post('/api/create/user', async (req, res) => {
    try {
      const { email, password,name } = req.body;
  
      const query = 'SELECT * FROM clients WHERE email = ?';
      db.query(query, [email], (error, results) => {
        if (error) {
          console.error('Error executing MySQL query: ' + error);
          res.status(500).json({ message: 'Internal Server Error' });
        } else if (results.length > 0) {
          res.status(400).json({ message: 'Email already registered' });
        } else {
          const saltRounds = 10;
          bcrypt.hash(password, saltRounds, (hashError, hashedPassword) => {
            if (hashError) {
              console.error('Error hashing the password: ' + hashError);
              res.status(500).json({ message: 'Internal Server Error' });
            } else {
              const insertQuery = 'INSERT INTO clients (email, password,name) VALUES (?, ?,?)';
              db.query(insertQuery, [email, hashedPassword,name], (insertError) => {
                if (insertError) {
                  console.error('Error executing MySQL query: ' + insertError);
                  res.status(500).json({ message: 'Internal Server Error' });
                } else {
                    const token = jwt.sign({ clientId: results.insertId }, process.env.AUTH_SECRET);
                    res.status(201).json({
                      message: 'Signup successful',
                      token: token,
                      details: {
                        _id: results.insertId,
                        email: email,
                        name: name,
                      },
                    });
                }
              });
            }
          });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Login route
router.post('/api/client/do/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const query = 'SELECT * FROM clients WHERE email = ?';
      db.query(query, [email], (error, results) => {
        if (error) {
          console.error('Error executing MySQL query: ' + error);
          res.status(500).json({ message: 'Internal Server Error' });
        } else if (results.length === 0) {
          res.status(401).json({ message: 'Authentication failed' });
        } else {
          bcrypt.compare(password, results[0].password, (compareError, isPasswordValid) => {
            if (compareError) {
              console.error('Error comparing passwords: ' + compareError);
              res.status(500).json({ message: 'Internal Server Error' });
            } else if (!isPasswordValid) {
              res.status(401).json({ message: 'Authentication failed' });
            } else {
              // Create a JWT token with the admin's ID as the payload
              const token = jwt.sign({ adminId: results[0]._id }, process.env.AUTH_SECRET);
              res.status(200).json({
                message: 'Login successful',
                token: token,
                details: results[0],
              });
            }
          });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get("/api/user/data", requireLogin, (req, res) => {
    const { _id } = req.user;
    const query = 'SELECT * FROM clients WHERE _id = ?'; 
    db.query(query, [_id], (error, results) => {
      if (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Server error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: "Invalid user" });
      }
  
      const user = results[0];
      // console.log(user)
      return res.status(200).json({ user });
    });
  });

  router.put('/api/update/user', requireLogin, async (req, res) => {
  try {
    const { _id } = req.user;
    const { name, phone, address, city, image} = req.body;

    const updateQuery = 'UPDATE clients SET name = ?, phone = ?, address = ?, city = ?, image = ? WHERE _id = ?';
    db.query(updateQuery, [name, phone||null, address||null, city||null,image||null, _id], (error, results) => {
      if (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'User profile updated successfully',});
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

  module.exports = router;