// backend/tests/integration/clienteRoutes.test.js
const request = require('supertest');
const { app, connectDB } = require('../../index');
const { sequelize } = require('../../src/config/db');

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  await connectDB();
  // Fuerza la sincronización para tener BD limpia
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Rutas de clientes (integración)', () => {
  it('GET /clientes → [] inicialmente', async () => {
    const res = await request(app).get('/clientes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

  it('POST /clientes → crea un cliente y lo devuelve', async () => {
    const newClient = {
      nombre: 'Test',
      apellido: 'Uno',
      telefono: '123456789',
      email: 'test1@mail.com',
      direccion: 'Calle Falsa 123'
    };
    const res = await request(app)
      .post('/clientes')
      .send(newClient);

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({
      id: expect.any(Number),
      nombre: 'Test',
      email: 'test1@mail.com'
    });

    // Verificar que ahora GET devuelve un elemento
    const getRes = await request(app).get('/clientes');
    expect(getRes.body).toHaveLength(1);
    expect(getRes.body[0]).toMatchObject({ email: 'test1@mail.com' });
  });

  // Opcional: tests para PUT y DELETE
});
