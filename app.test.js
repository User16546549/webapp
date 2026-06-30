const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
  it('returns welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBeDefined();
  });
});

describe('GET /health', () => {
  it('returns status ok with uptime', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.uptime).toBeDefined();
  });
});

describe('GET /api/items', () => {
  it('returns list of items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('GET /api/items/:id', () => {
  it('returns item by id', async () => {
    const res = await request(app).get('/api/items/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it('returns 404 for unknown id', async () => {
    const res = await request(app).get('/api/items/999');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Item not found');
  });
});

describe('POST /api/items', () => {
  it('creates a new item', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'Item C', price: 30.0 });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Item C');
    expect(res.body.price).toBe(30.0);
  });

  it('returns 400 when name is missing', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ price: 15.0 });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('returns 400 when price is missing', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'Item D' });
    expect(res.statusCode).toBe(400);
  });
});
