const request = require('supertest');
const app = require('../src/app');

describe('Test Route handler', () => {
  test('responds to /', async () => {
    const response = await request(app).get('/');
    expect(response.text).toEqual('this is express');
    expect(response.status).toBe(200);
  });
});
