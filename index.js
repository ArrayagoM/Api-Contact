require('dotenv').config();
const app = require('./src/app');
const port = process.env.PORT || 3727;
const { connectDB } = require('./src/config/bd');

connectDB()
  .then(() => {
    app.listen(port, async () => {
      console.log(`Servidor escuchando en:`);
      console.log(`→ http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
    process.exit(1);
  });
