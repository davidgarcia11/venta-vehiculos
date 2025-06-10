// backend/src/config/db.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const dialect = process.env.DB_DIALECT || 'sqlite';
let sequelize;

if (dialect === 'sqlite') {
  // Configuración para SQLite
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || 'src/database.sqlite',
    logging: false
  });
} else {
  // Configuración para MariaDB (u otros dialectos SQL)
  sequelize = new Sequelize(
    process.env.DB_NAME,   // nombre de la base de datos
    process.env.DB_USER,   // usuario
    process.env.DB_PASS,   // contraseña
    {
      host: process.env.DB_HOST,
      dialect: dialect,    // ej. 'mariadb'
      logging: false
    }
  );
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Base de datos conectada correctamente.');
    if (process.env.NODE_ENV === 'test') {
      // En CI/tests recreamos las tablas completamente
      await sequelize.sync({ force: true });
    } else {
      // En desarrollo/producción ajustamos sin perder datos
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
