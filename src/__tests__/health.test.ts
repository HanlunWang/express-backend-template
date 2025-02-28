import request from 'supertest';
import express from 'express';
import routes from '../routes';

const app = express();
app.use(express.json());
app.use('/api', routes);

describe('Health Check Endpoint', () => {
  it('should return 200 and success message', async () => {
    const res = await request(app).get('/api/health');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'API is running');
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('environment');
  });
}); 