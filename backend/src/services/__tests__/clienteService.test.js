// backend/src/services/__tests__/clienteService.test.js
const service = require('../clienteService');
const { Cliente } = require('../../models');

jest.mock('../../models', () => ({
  Cliente: {
    findAll: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
  }
}));

describe('clienteService', () => {
  afterEach(() => jest.clearAllMocks());

  describe('obtenerClientes', () => {
    it('debe llamar a Cliente.findAll y devolver la lista', async () => {
      const mockData = [{ id: 1, nombre: 'Test' }];
      Cliente.findAll.mockResolvedValue(mockData);
      const result = await service.obtenerClientes();
      expect(Cliente.findAll).toHaveBeenCalled();
      expect(result).toBe(mockData);
    });
  });

  describe('crearCliente', () => {
    it('debe llamar a Cliente.create con los datos correctos', async () => {
      const data = { nombre: 'Ana' };
      const mockCreated = { id: 2, ...data };
      Cliente.create.mockResolvedValue(mockCreated);
      const result = await service.crearCliente(data);
      expect(Cliente.create).toHaveBeenCalledWith(data);
      expect(result).toBe(mockCreated);
    });
  });

  describe('obtenerClientePorId', () => {
    it('debe devolver cliente cuando existe', async () => {
      const mockClient = { id: 3, nombre: 'Juan' };
      Cliente.findByPk.mockResolvedValue(mockClient);
      const result = await service.obtenerClientePorId(3);
      expect(Cliente.findByPk).toHaveBeenCalledWith(3);
      expect(result).toBe(mockClient);
    });

    it('debe lanzar error 404 cuando no existe', async () => {
      Cliente.findByPk.mockResolvedValue(null);
      await expect(service.obtenerClientePorId(5)).rejects.toEqual({ status: 404, message: 'Cliente no encontrado' });
    });
  });

  describe('actualizarCliente', () => {
    it('debe actualizar y devolver cliente cuando existe', async () => {
      const mockClient = { id: 4, update: jest.fn().mockResolvedValue({ id: 4, nombre: 'Nuevo' }) };
      Cliente.findByPk.mockResolvedValue(mockClient);
      const result = await service.actualizarCliente(4, { nombre: 'Nuevo' });
      expect(Cliente.findByPk).toHaveBeenCalledWith(4);
      expect(mockClient.update).toHaveBeenCalledWith({ nombre: 'Nuevo' });
      expect(result).toEqual({ id: 4, nombre: 'Nuevo' });
    });

    it('debe lanzar error 404 cuando no existe', async () => {
      Cliente.findByPk.mockResolvedValue(null);
      await expect(service.actualizarCliente(6, {})).rejects.toEqual({ status: 404, message: 'Cliente no encontrado' });
    });
  });

  describe('eliminarCliente', () => {
    it('debe eliminar cliente existente', async () => {
      const mockClient = { id: 7, destroy: jest.fn().mockResolvedValue() };
      Cliente.findByPk.mockResolvedValue(mockClient);
      await expect(service.eliminarCliente(7)).resolves.toBeUndefined();
      expect(Cliente.findByPk).toHaveBeenCalledWith(7);
      expect(mockClient.destroy).toHaveBeenCalled();
    });

    it('debe lanzar error 404 cuando no existe', async () => {
      Cliente.findByPk.mockResolvedValue(null);
      await expect(service.eliminarCliente(8)).rejects.toEqual({ status: 404, message: 'Cliente no encontrado' });
    });
  });
});
