require('dotenv').config();
const { connectDB } = require('./src/config/bd');
const app = require('./src/app');
const port = process.env.PORT || 3727;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Servidor escuchando en: http://localhost:${port}`);
  });
});
