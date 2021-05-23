function sendEmail(data) {
  require("dotenv").config();
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: data.to,
    cc: data.cc,
    subject: data.subject,
    text: data.text,
  };

  if (data.bcc) {
    mailOptions = {
      from: process.env.EMAIL_USERNAME,
      cc: data.cc,
      bcc: data.bcc,
      subject: data.subject,
      text: data.text,
    };
  }
  if (!data.bcc && !data.cc) {
    mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: data.to,
      subject: data.subject,
      text: data.text,
    };
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendEmail;
