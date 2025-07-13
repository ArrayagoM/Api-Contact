const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res.status(201).json({
      msg: 'Usuario registrado con éxito',
      slug: user.formSlug,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        formSlug: user.formSlug,
      },
    });
  } catch (error) {
    console.error('Error al registrar:', error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Email y contraseña son obligatorios.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Credenciales inválidas.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Credenciales inválidas.' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res.json({
      msg: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        formSlug: user.formSlug,
      },
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error al obtener información del usuario:', error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

module.exports = { registerUser, loginUser, getUserInfo };
