const bcrypt = require('bcrypt');
const User = require('../models/User.js');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, formSlug } = req.body;

    if (!name || !email || !password || !formSlug) {
      return res.status(400).json({ msg: 'Todos los campos son obligatorios.' });
    }

    const slugExists = await User.findOne({ formSlug });
    if (slugExists) {
      return res.status(400).json({ msg: 'Este slug ya está en uso. Elegí otro.' });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ msg: 'Este email ya está registrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      formSlug,
    });

    await user.save();

    res.status(201).json({
      msg: 'Usuario registrado con éxito',
      slug: user.formSlug,
    });
  } catch (error) {
    console.error('Error al registrar:', error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

module.exports = { registerUser };
