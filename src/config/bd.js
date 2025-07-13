const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL_DEPLOY, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    process.exit(1);
  }
};

module.exports = { connectDB };
