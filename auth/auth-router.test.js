const request = require('supertest');

const server = require('../api/server.js');
const db = require('../db/db-config.js');

describe('auth router', () => {
  it('should run the tests', () => {
    expect(true).toBe(true);
  });

  beforeAll(async () => {
    await db.seed.run();
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
});