const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey", // This is literally the string "apikey"
    pass: process.env.SENDGRID_API_KEY, // Use your API key as password
  },
});

module.exports = transporter;
