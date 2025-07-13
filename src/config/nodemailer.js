const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD_NODEMAILER,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Correo enviado: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('Error al enviar correo:', error);
    throw error;
  }
};

const sendMail = async ({ to, subject, text }) => {
  await transporter.sendMail({
    from: `"ApiContact" <${process.env.MAIL_USER}>`,
    to,
    subject,
    text,
  });
};

module.exports = {
  sendMail,
  sendEmail,
};
