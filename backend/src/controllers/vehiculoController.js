// backend/src/controllers/vehiculoController.js
const service = require('../services/vehiculoService');

exports.crearVehiculo = async (req, res) => {
  try {
    const vehiculo = await service.crearVehiculo(req.body);
    res.status(201).json(vehiculo);
  } catch (err) {
    console.error("❌ Error al crear vehículo:", err);
    const status = err.status || 500;
    const message = err.message || (err.errors ? err.errors.map(e => e.message) : 'Error interno');
    res.status(status).json({ error: message });
  }
};

exports.obtenerVehiculos = async (req, res) => {
  try {
    const lista = await service.obtenerVehiculos();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerVehiculoPorId = async (req, res) => {
  try {
    const vehiculo = await service.obtenerVehiculoPorId(req.params.id);
    res.json(vehiculo);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
};

exports.actualizarVehiculo = async (req, res) => {
  try {
    const vehiculo = await service.actualizarVehiculo(req.params.id, req.body);
    res.json(vehiculo);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
};

exports.eliminarVehiculo = async (req, res) => {
  try {
    await service.eliminarVehiculo(req.params.id);
    res.json({ message: 'Vehículo eliminado correctamente' });
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
};
