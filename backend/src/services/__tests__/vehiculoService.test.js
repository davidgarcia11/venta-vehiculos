// backend/src/services/__tests__/vehiculoService.test.js
const service = require('../vehiculoService');
const { Vehiculo } = require('../../models');

jest.mock('../../models', () => ({
  Vehiculo: {
    findAll: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn()
  }
}));

describe('vehiculoService', () => {
  afterEach(() => jest.clearAllMocks());

  test('obtenerVehiculos llama a findAll y devuelve resultado', async () => {
    const mockList = [{ id: 1 }];
    Vehiculo.findAll.mockResolvedValue(mockList);
    const res = await service.obtenerVehiculos();
    expect(Vehiculo.findAll).toHaveBeenCalled();
    expect(res).toBe(mockList);
  });

  test('crearVehiculo llama a create con los datos', async () => {
    const data = { marca: 'A', modelo: 'B' };
    const mockCreated = { id: 2, ...data };
    Vehiculo.create.mockResolvedValue(mockCreated);
    const res = await service.crearVehiculo(data);
    expect(Vehiculo.create).toHaveBeenCalledWith(data);
    expect(res).toBe(mockCreated);
  });

  test('obtenerVehiculoPorId devuelve entidad si existe', async () => {
    const mockV = { id: 3 };
    Vehiculo.findByPk.mockResolvedValue(mockV);
    await expect(service.obtenerVehiculoPorId(3)).resolves.toBe(mockV);
  });

  test('obtenerVehiculoPorId lanza 404 si no existe', async () => {
    Vehiculo.findByPk.mockResolvedValue(null);
    await expect(service.obtenerVehiculoPorId(4))
      .rejects.toEqual({ status: 404, message: 'Vehículo no encontrado' });
  });

  test('actualizarVehiculo llama a update y devuelve actualizado', async () => {
    const mockInstance = { id: 5, update: jest.fn().mockResolvedValue({ id: 5, marca: 'X' }) };
    Vehiculo.findByPk.mockResolvedValue(mockInstance);
    const res = await service.actualizarVehiculo(5, { marca: 'X' });
    expect(Vehiculo.findByPk).toHaveBeenCalledWith(5);
    expect(mockInstance.update).toHaveBeenCalledWith({ marca: 'X' });
    expect(res).toEqual({ id: 5, marca: 'X' });
  });

  test('actualizarVehiculo lanza 404 si no existe', async () => {
    Vehiculo.findByPk.mockResolvedValue(null);
    await expect(service.actualizarVehiculo(6, {}))
      .rejects.toEqual({ status: 404, message: 'Vehículo no encontrado' });
  });

  test('eliminarVehiculo llama a destroy en instancia existente', async () => {
    const mockInstance = { id: 7, destroy: jest.fn().mockResolvedValue() };
    Vehiculo.findByPk.mockResolvedValue(mockInstance);
    await expect(service.eliminarVehiculo(7)).resolves.toBeUndefined();
    expect(Vehiculo.findByPk).toHaveBeenCalledWith(7);
    expect(mockInstance.destroy).toHaveBeenCalled();
  });

  test('eliminarVehiculo lanza 404 si no existe', async () => {
    Vehiculo.findByPk.mockResolvedValue(null);
    await expect(service.eliminarVehiculo(8))
      .rejects.toEqual({ status: 404, message: 'Vehículo no encontrado' });
  });
});
