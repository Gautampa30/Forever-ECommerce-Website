const transporter = require("../config/emailConfig");

async function sendEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: `"FOREVER" <${process.env.SMTP_USER}>`, // sender address
      to,       // recipient email address
      subject,  // email subject
      text,     // plain text message (or html: "<b>...</b>")
    });
    console.log("Email sent to", to);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}

module.exports = sendEmail;
