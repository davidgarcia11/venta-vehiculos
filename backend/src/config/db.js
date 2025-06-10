// backend/src/config/db.js
require('dotenv').config();                  // Carga variables de .env
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,           // 'sqlite' u otro dialecto según env
  storage: process.env.DB_STORAGE,           // 'src/database.sqlite' o path según env
  logging: false,                            // Desactiva logs en consola
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Base de datos conectada correctamente.');
    if (process.env.NODE_ENV === 'test') {
      // En tests: recreamos las tablas desde cero
      await sequelize.sync({ force: true });
    } else {
      // En dev/prod: ajustamos sin perder datos
      await sequelize.sync({ alter: true });
    }
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    } else {
      throw error;
    }
  }
};


module.exports = { sequelize, connectDB };
