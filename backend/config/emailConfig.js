const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid");

const transporter = nodemailer.createTransport(
  sgTransport({
    apiKey: process.env.SENDGRID_API_KEY,
  })
);

module.exports = transporter;
