const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');

// Importar modelos
const Cliente = require('./cliente');
const Vehiculo = require('./vehiculo');
const Usuario = require('./usuario');
const Venta = require('./venta');

// Asociaciones
Vehiculo.hasMany(Venta, { foreignKey: 'vehiculoId' });
Usuario.hasMany(Venta, { foreignKey: 'usuarioId' });
Venta.belongsTo(Vehiculo, { foreignKey: 'vehiculoId' });
Venta.belongsTo(Usuario, { foreignKey: 'usuarioId' });

const db = {
    sequelize,
    Cliente,
    Vehiculo,
    Usuario,
    Venta,
};

module.exports = db;
