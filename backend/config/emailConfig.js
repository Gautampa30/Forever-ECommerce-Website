const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,       // e.g., smtp.gmail.com
  port: process.env.SMTP_PORT,       // e.g., 587
  secure: false,                     // true for port 465, false for 587
  auth: {
    user: process.env.SMTP_USER,     // your email address
    pass: process.env.SMTP_PASSWORD, // your email password or app password
  },
});

module.exports = transporter;
