// backend/src/controllers/__tests__/clienteController.test.js
const controller = require('../clienteController');
const service = require('../../services/clienteService');

// mocks de req y res
const mockReq = (body = {}, params = {}) => ({ body, params });
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json   = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock('../../services/clienteService');

describe('clienteController', () => {
  afterEach(() => jest.clearAllMocks());

  describe('crearCliente', () => {
    it('debe responder 201 y JSON con el cliente creado', async () => {
      const req = mockReq({ nombre: 'Luis', email: 'luis@mail.com' });
      const res = mockRes();
      service.crearCliente.mockResolvedValue({ id: 10, nombre: 'Luis' });

      await controller.crearCliente(req, res);

      expect(service.crearCliente).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 10, nombre: 'Luis' });
    });

    it('debe responder 500 si el service lanza error', async () => {
      const req = mockReq({});
      const res = mockRes();
      service.crearCliente.mockRejectedValue(new Error('fallo interno'));

      await controller.crearCliente(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'fallo interno' });
    });
  });

  describe('obtenerClientes', () => {
    it('debe responder con la lista de clientes', async () => {
      const req = mockReq();
      const res = mockRes();
      const lista = [{ id: 1 }, { id: 2 }];
      service.obtenerClientes.mockResolvedValue(lista);

      await controller.obtenerClientes(req, res);

      expect(service.obtenerClientes).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(lista);
    });

    it('debe responder 500 si hay error', async () => {
      const req = mockReq();
      const res = mockRes();
      service.obtenerClientes.mockRejectedValue(new Error('fetch error'));

      await controller.obtenerClientes(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'fetch error' });
    });
  });

  describe('obtenerClientePorId', () => {
    it('debe responder con el cliente si existe', async () => {
      const req = mockReq({}, { id: '5' });
      const res = mockRes();
      const cliente = { id: 5, nombre: 'Pedro' };
      service.obtenerClientePorId.mockResolvedValue(cliente);

      await controller.obtenerClientePorId(req, res);

      expect(service.obtenerClientePorId).toHaveBeenCalledWith('5');
      expect(res.json).toHaveBeenCalledWith(cliente);
    });

    it('debe responder 404 si no existe', async () => {
      const req = mockReq({}, { id: '6' });
      const res = mockRes();
      service.obtenerClientePorId.mockRejectedValue({ status: 404, message: 'Cliente no encontrado' });

      await controller.obtenerClientePorId(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Cliente no encontrado' });
    });

    it('debe responder 500 en errores no esperados', async () => {
      const req = mockReq({}, { id: '7' });
      const res = mockRes();
      service.obtenerClientePorId.mockRejectedValue(new Error('otro error'));

      await controller.obtenerClientePorId(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'otro error' });
    });
  });

  describe('actualizarCliente', () => {
    it('debe actualizar y responder con cliente modificado', async () => {
      const req = mockReq({ nombre: 'Nuevo' }, { id: '8' });
      const res = mockRes();
      const updated = { id: 8, nombre: 'Nuevo' };
      service.actualizarCliente.mockResolvedValue(updated);

      await controller.actualizarCliente(req, res);

      expect(service.actualizarCliente).toHaveBeenCalledWith('8', req.body);
      expect(res.json).toHaveBeenCalledWith(updated);
    });

    it('debe responder 404 si no existe', async () => {
      const req = mockReq({}, { id: '9' });
      const res = mockRes();
      service.actualizarCliente.mockRejectedValue({ status: 404, message: 'Cliente no encontrado' });

      await controller.actualizarCliente(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Cliente no encontrado' });
    });
  });

  describe('eliminarCliente', () => {
    it('debe eliminar y responder con mensaje', async () => {
      const req = mockReq({}, { id: '10' });
      const res = mockRes();
      service.eliminarCliente.mockResolvedValue();

      await controller.eliminarCliente(req, res);

      expect(service.eliminarCliente).toHaveBeenCalledWith('10');
      expect(res.json).toHaveBeenCalledWith({ message: 'Cliente eliminado correctamente' });
    });

    it('debe responder 404 si no existe', async () => {
      const req = mockReq({}, { id: '11' });
      const res = mockRes();
      service.eliminarCliente.mockRejectedValue({ status: 404, message: 'Cliente no encontrado' });

      await controller.eliminarCliente(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Cliente no encontrado' });
    });
  });
});
