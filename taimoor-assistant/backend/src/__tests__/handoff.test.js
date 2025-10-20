const request = require('supertest');
const app = require('../server');

describe('Handoff API', () => {
  describe('POST /api/handoff', () => {
    const validHandoffData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      message: 'I need a website',
      consent: true
    };

    it('should submit handoff data successfully', async () => {
      const response = await request(app)
        .post('/api/handoff')
        .send(validHandoffData)
        .expect(200);

      expect(response.body).toHaveProperty('ok');
      expect(response.body.ok).toBe(true);
      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 for missing required fields', async () => {
      const response = await request(app)
        .post('/api/handoff')
        .send({ name: 'John' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Missing required fields');
    });

    it('should return 400 for invalid email', async () => {
      const invalidData = { ...validHandoffData, email: 'invalid-email' };
      
      const response = await request(app)
        .post('/api/handoff')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Invalid email format');
    });

    it('should return 400 for missing consent', async () => {
      const noConsentData = { ...validHandoffData, consent: false };
      
      const response = await request(app)
        .post('/api/handoff')
        .send(noConsentData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Consent required');
    });

    it('should work without phone number', async () => {
      const dataWithoutPhone = { ...validHandoffData };
      delete dataWithoutPhone.phone;

      const response = await request(app)
        .post('/api/handoff')
        .send(dataWithoutPhone)
        .expect(200);

      expect(response.body.ok).toBe(true);
    });
  });

  describe('GET /api/handoff/status', () => {
    it('should return status', async () => {
      const response = await request(app)
        .get('/api/handoff/status')
        .expect(200);

      expect(response.body).toHaveProperty('status');
      expect(response.body.status).toBe('ok');
    });
  });
});
