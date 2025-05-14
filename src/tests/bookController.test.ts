import request from 'supertest';
import app from "../app"

describe('Book Controller', () => {
  it('should return 200 for GET /api/books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toEqual(200);
  });
});
