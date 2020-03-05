const request = require('supertest');

const server = require('../api/server.js');
const db = require('../db/db-config.js');

describe('auth router', () => {
  it('should run the tests', () => {
    expect(true).toBe(true);
  });

  beforeAll(() => {
    return db.seed.run();
  });

  describe('POST /api/register', () => {
    it('should return 201 Created', async () => {
      const res = await request(server).post('/api/register').send({
        username: 'moo',
        password: 'cow',
        email: 'moo@gmail.com'
      });
      expect(res.status).toBe(201);
    });

    it('should return a token', async () => {
      const res = await request(server).post('/api/register').send({
        username: 'sillymander',
        password: 'oliver',
        email: 'sillymander@gmail.com'
      });
      expect(typeof res.body.token === 'string').toBe(true);
    });

    it('should return 400 Bad Request if email omitted', async () => {
      const res = await request(server).post('/api/register').send({
        username: 'drongo',
        password: 'esther',
      });
      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should return 200 OK', async () => {
      const res = await request(server).post('/api/login').send({
        username: 'lily',
        password: process.env.USER_1
      });
      expect(res.status).toBe(200);
    });

    it('should return a token', async () => {
      const res = await request(server).post('/api/login').send({
        username: 'aaron',
        password: process.env.USER_2
      });
      expect(typeof res.body.token === 'string').toBe(true);
    });

    it('should return 400 Bad Request if username omitted', async () => {
      const res = await request(server).post('/api/login').send({
        username: '',
        password: 'esther',
      });
      expect(res.status).toBe(400);
    });

    it('should return 400 Unauthorized if password incorrect', async () => {
      const res = await request(server).post('/api/login').send({
        username: 'lily',
        password: 'wrongpassword',
      });
      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/validate', () => {
    it('should return validToken: true for valid token', async () => {
      const { body } = await request(server).post('/api/login').send({
        username: 'lily',
        password: process.env.USER_1
      });
      const res = await request(server).get('/api/validate').set('Authorization', body.token);
      expect(res.body.validToken).toBe(true);
    });
  });
});