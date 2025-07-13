const User = require('../models/User.js');
const sendMail = require('../config/nodemailer.js');

const receiveForm = async (req, res) => {
  try {
    const { slug } = req.params;
    const formData = req.body;

    const user = await User.findOne({ formSlug: slug });
    if (!user) {
      return res.status(404).json({ msg: 'Slug no válido' });
    }

    // Armamos el cuerpo del mail dinámicamente con los datos del form
    let body = `📬 Nuevo contacto desde tu formulario:\n\n`;
    for (let key in formData) {
      body += `${key}: ${formData[key]}\n`;
    }

    await sendMail({
      to: user.email,
      subject: 'Nuevo mensaje desde tu landing',
      text: body,
    });

    res.status(200).json({ msg: 'Formulario enviado con éxito ✅' });
  } catch (error) {
    console.error('Error en formController:', error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

module.exports = { receiveForm };
