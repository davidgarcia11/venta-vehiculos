// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/config/db');

// 1. Crear la app de Express
const app = express();
app.use(cors());
app.use(express.json());

// 2. Montar las rutas
app.use('/clientes', require('./src/routes/clienteRoutes'));
app.use('/vehiculos', require('./src/routes/vehiculoRoutes'));

// 3. Arrancar el servidor solo si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  }).catch(err => {
    console.error('❌ Error al conectar con la base de datos:', err);
    process.exit(1);
  });
}

// 4. Exportar la app y la conexión para poder usar en tests
module.exports = { app, connectDB };
