// backend/src/controllers/clienteController.js
const service = require('../services/clienteService');

exports.crearCliente = async (req, res, next) => {
  try {
    const cliente = await service.crearCliente(req.body);
    res.status(201).json(cliente);
  } catch (err) {
    // err puede ser {status, message} o un Error genérico
    const status = err.status || 500;
    res.status(status).json({ error: err.message || 'Error interno' });
  }
};

exports.obtenerClientes = async (req, res, next) => {
  try {
    const clientes = await service.obtenerClientes();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerClientePorId = async (req, res, next) => {
  try {
    const cliente = await service.obtenerClientePorId(req.params.id);
    res.json(cliente);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
};

exports.actualizarCliente = async (req, res, next) => {
  try {
    const cliente = await service.actualizarCliente(req.params.id, req.body);
    res.json(cliente);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
};

exports.eliminarCliente = async (req, res, next) => {
  try {
    await service.eliminarCliente(req.params.id);
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
};
