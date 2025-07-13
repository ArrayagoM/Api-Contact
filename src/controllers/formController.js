// src/controllers/formController.js
const User = require('../models/User');
const { sendMail } = require('../config/nodemailer');

const receiveForm = async (req, res) => {
  try {
    console.log('llego al controlador');

    let slug = req.params.slug;
    console.log(`raw slug: '${slug}'`);
    slug = slug.trim().toLowerCase();
    console.log(`normalized slug: '${slug}'`);

    const user = await User.findOne({ formSlug: slug });
    if (!user) {
      console.log('no encontré usuario con ese slug');
      return res.status(404).json({ msg: 'Slug no válido' });
    }
    console.log('usuario encontrado:', user.email);

    const formData = req.body;
    let body = `📬 Nuevo contacto desde tu formulario:\n\n`;
    for (const key in formData) {
      body += `${key}: ${formData[key]}\n`;
    }

    await sendMail({
      to: user.email,
      subject: `Nuevo mensaje desde ${slug}`,
      text: body,
    });

    return res.status(200).json({ msg: 'Formulario enviado con éxito ✅' });
  } catch (error) {
    console.error('Error en formController:', error);
    return res.status(500).json({ msg: 'Error interno del servidor' });
  }
};
module.exports = { receiveForm };
