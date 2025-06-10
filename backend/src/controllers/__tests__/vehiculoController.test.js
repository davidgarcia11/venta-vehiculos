// backend/src/controllers/__tests__/vehiculoController.test.js
const controller = require('../vehiculoController');
const service = require('../../services/vehiculoService');

// Mocks de req y res
const mockReq = (body = {}, params = {}) => ({ body, params });
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json   = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock('../../services/vehiculoService');

describe('vehiculoController', () => {
  afterEach(() => jest.clearAllMocks());

  test('crearVehiculo responde 201 con JSON', async () => {
    const req = mockReq({ marca: 'X', modelo: 'Y' });
    const res = mockRes();
    service.crearVehiculo.mockResolvedValue({ id: 5, marca: 'X' });

    await controller.crearVehiculo(req, res);
    expect(service.crearVehiculo).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 5, marca: 'X' });
  });

  test('crearVehiculo responde 500 ante error', async () => {
    const req = mockReq({});
    const res = mockRes();
    service.crearVehiculo.mockRejectedValue(new Error('fallo'));

    await controller.crearVehiculo(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'fallo' });
  });

  test('obtenerVehiculos responde con lista', async () => {
    const req = mockReq();
    const res = mockRes();
    const lista = [{ id: 1 }];
    service.obtenerVehiculos.mockResolvedValue(lista);

    await controller.obtenerVehiculos(req, res);
    expect(service.obtenerVehiculos).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(lista);
  });

  test('obtenerVehiculos responde 500 ante error', async () => {
    const req = mockReq();
    const res = mockRes();
    service.obtenerVehiculos.mockRejectedValue(new Error('err'));

    await controller.obtenerVehiculos(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'err' });
  });

  test('obtenerVehiculoPorId responde con entidad existente', async () => {
    const req = mockReq({}, { id: '3' });
    const res = mockRes();
    const entidad = { id: 3, marca: 'Z' };
    service.obtenerVehiculoPorId.mockResolvedValue(entidad);

    await controller.obtenerVehiculoPorId(req, res);
    expect(service.obtenerVehiculoPorId).toHaveBeenCalledWith('3');
    expect(res.json).toHaveBeenCalledWith(entidad);
  });

  test('obtenerVehiculoPorId responde 404 si no existe', async () => {
    const req = mockReq({}, { id: '4' });
    const res = mockRes();
    service.obtenerVehiculoPorId.mockRejectedValue({ status: 404, message: 'Vehículo no encontrado' });

    await controller.obtenerVehiculoPorId(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Vehículo no encontrado' });
  });

  test('actualizarVehiculo responde con entidad actualizada', async () => {
    const req = mockReq({ marca: 'N' }, { id: '5' });
    const res = mockRes();
    const updated = { id: 5, marca: 'N' };
    service.actualizarVehiculo.mockResolvedValue(updated);

    await controller.actualizarVehiculo(req, res);
    expect(service.actualizarVehiculo).toHaveBeenCalledWith('5', req.body);
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  test('actualizarVehiculo responde 404 si no existe', async () => {
    const req = mockReq({}, { id: '6' });
    const res = mockRes();
    service.actualizarVehiculo.mockRejectedValue({ status: 404, message: 'Vehículo no encontrado' });

    await controller.actualizarVehiculo(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Vehículo no encontrado' });
  });

  test('eliminarVehiculo responde mensaje de éxito', async () => {
    const req = mockReq({}, { id: '7' });
    const res = mockRes();
    service.eliminarVehiculo.mockResolvedValue();

    await controller.eliminarVehiculo(req, res);
    expect(service.eliminarVehiculo).toHaveBeenCalledWith('7');
    expect(res.json).toHaveBeenCalledWith({ message: 'Vehículo eliminado correctamente' });
  });

  test('eliminarVehiculo responde 404 si no existe', async () => {
    const req = mockReq({}, { id: '8' });
    const res = mockRes();
    service.eliminarVehiculo.mockRejectedValue({ status: 404, message: 'Vehículo no encontrado' });

    await controller.eliminarVehiculo(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Vehículo no encontrado' });
  });
});
