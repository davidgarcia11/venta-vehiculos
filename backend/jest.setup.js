// jest.setup.js
const { app, connectDB } = require('./index'); // ajusta según tu export
beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  await connectDB();
});
