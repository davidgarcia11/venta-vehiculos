const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Vehiculo = require('./vehiculo');
const Usuario = require('./usuario');

const Venta = sequelize.define('Venta', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    vehiculoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Vehiculo,
            key: 'id',
        },
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id',
        },
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    precio: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
}, {
    tableName: 'ventas',
    timestamps: false,
});

module.exports = Venta;
