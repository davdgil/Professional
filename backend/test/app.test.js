// auth.test.js
const request = require('supertest');
const app = require('../app'); // Importa la configuración de tu servidor Express

describe('POST /auth/register', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        city: 'Ciudad Metrópolis'
        // Añade aquí otros campos necesarios para el registro
      })
      .expect(201); // o el código de estado que esperes

    expect(res.body).toHaveProperty('message');
    // Añade más expectativas según lo que deba devolver tu API
  });
});

describe('POST /auth/login', () => {
  it('should login the user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      })
      .expect(200);

    expect(res.body).toHaveProperty('token');
    // Aquí puedes añadir expectativas para verificar el rol, si es necesario, y otras propiedades.
  });
});
