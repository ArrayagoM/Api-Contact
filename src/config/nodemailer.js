// config/nodemailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD_NODEMAILER,
  },
});

const sendMail = async ({ to, subject, text }) => {
  return transporter.sendMail({
    from: `"ApiContact" <${process.env.EMAIL}>`,
    to,
    subject,
    text,
  });
};

module.exports = { sendMail };
