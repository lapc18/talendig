import request from 'supertest';
import { app } from '../src/app';

describe('[Test]: health check', () => {
  
  it('GET /api/health -> ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
  
});

