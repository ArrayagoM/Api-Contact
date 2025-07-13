// src/app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const formRoutes = require('./routes/formRoutes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

// Rutas API
app.use('/api', authRoutes);
app.use('/form', formRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..public/views', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    msg: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

module.exports = app;
