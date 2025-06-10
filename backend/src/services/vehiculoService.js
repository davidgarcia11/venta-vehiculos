// backend/src/services/vehiculoService.js
const { Vehiculo } = require('../models');

async function crearVehiculo(data) {
  // Aquí podrías validar campos antes de la inserción
  return await Vehiculo.create(data);
}

async function obtenerVehiculos() {
  return await Vehiculo.findAll();
}

async function obtenerVehiculoPorId(id) {
  const vehiculo = await Vehiculo.findByPk(id);
  if (!vehiculo) throw { status: 404, message: 'Vehículo no encontrado' };
  return vehiculo;
}

async function actualizarVehiculo(id, data) {
  const vehiculo = await Vehiculo.findByPk(id);
  if (!vehiculo) throw { status: 404, message: 'Vehículo no encontrado' };
  return await vehiculo.update(data);
}

async function eliminarVehiculo(id) {
  const vehiculo = await Vehiculo.findByPk(id);
  if (!vehiculo) throw { status: 404, message: 'Vehículo no encontrado' };
  await vehiculo.destroy();
}

module.exports = {
  crearVehiculo,
  obtenerVehiculos,
  obtenerVehiculoPorId,
  actualizarVehiculo,
  eliminarVehiculo
};
