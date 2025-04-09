const request = require('supertest');
const app = require('../app');
const { checkInteger } = require('../checkLogic');

describe('Unit Tests - checkInteger()', () => {
  test('returns high if > 100', () => {
    expect(checkInteger(150)).toBe('high');
  });

  test('returns low if <= 100', () => {
    expect(checkInteger(100)).toBe('low');
    expect(checkInteger(50)).toBe('low');
  });
});

describe('Regression Test - /check endpoint', () => {
  test('POST /check should return high', async () => {
    const res = await request(app).post('/check').send({ integer: 120 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ result: 'high' });
  });

  test('POST /check should return low', async () => {
    const res = await request(app).post('/check').send({ integer: 80 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ result: 'low' });
  });

  test('POST /check should handle invalid input', async () => {
    const res = await request(app).post('/check').send({ integer: 'abc' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});