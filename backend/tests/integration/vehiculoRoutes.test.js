// backend/tests/integration/vehiculoRoutes.test.js
const request = require('supertest');
const { app, connectDB } = require('../../index');
const { sequelize } = require('../../src/config/db');

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  await connectDB();
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Rutas de vehículos (integración)', () => {
  it('GET /vehiculos → [] inicialmente', async () => {
    const res = await request(app).get('/vehiculos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /vehiculos → crea un vehículo y lo devuelve', async () => {
    const nuevo = {
      marca: 'Toyota',
      modelo: 'Corolla',
      anio: 2020,
      precio: 20000,
      kilometraje: 10000,
      tipo: 'compacto'
    };
    const res = await request(app)
      .post('/vehiculos')
      .send(nuevo);

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({
      id: expect.any(Number),
      marca: 'Toyota',
      modelo: 'Corolla'
    });
  });
});
