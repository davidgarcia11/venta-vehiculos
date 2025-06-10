// backend/src/services/clienteService.js
const { Cliente } = require('../models'); // ajusta si tu index.js de models exporta differently

async function crearCliente(data) {
  // aquí podrías validar campos antes de insertar
  return await Cliente.create(data);
}

async function obtenerClientes() {
  return await Cliente.findAll();
}

async function obtenerClientePorId(id) {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) throw { status: 404, message: 'Cliente no encontrado' };
  return cliente;
}

async function actualizarCliente(id, data) {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) throw { status: 404, message: 'Cliente no encontrado' };
  return await cliente.update(data);
}

async function eliminarCliente(id) {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) throw { status: 404, message: 'Cliente no encontrado' };
  await cliente.destroy();
  return;
}

module.exports = {
  crearCliente,
  obtenerClientes,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente
};
