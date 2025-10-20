const request = require('supertest');
const app = require('../server');

describe('Chat API', () => {
  describe('POST /api/chat', () => {
    it('should send a message and get a response', async () => {
      const response = await request(app)
        .post('/api/chat')
        .send({ message: 'Hello' })
        .expect(200);

      expect(response.body).toHaveProperty('reply');
      expect(response.body).toHaveProperty('sessionId');
      expect(typeof response.body.reply).toBe('string');
      expect(response.body.reply.length).toBeGreaterThan(0);
    });

    it('should return 400 for missing message', async () => {
      const response = await request(app)
        .post('/api/chat')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Invalid input');
    });

    it('should return 400 for invalid message type', async () => {
      const response = await request(app)
        .post('/api/chat')
        .send({ message: 123 })
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Invalid input');
    });

    it('should handle session ID', async () => {
      const sessionId = 'test-session-123';
      
      const response = await request(app)
        .post('/api/chat')
        .send({ message: 'Hello', sessionId })
        .expect(200);

      expect(response.body.sessionId).toBe(sessionId);
    });
  });

  describe('GET /api/chat/session/:sessionId', () => {
    it('should return 404 for non-existent session', async () => {
      const response = await request(app)
        .get('/api/chat/session/non-existent')
        .expect(404);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Session not found');
    });
  });

  describe('DELETE /api/chat/session/:sessionId', () => {
    it('should return success for any session ID', async () => {
      const response = await request(app)
        .delete('/api/chat/session/any-session')
        .expect(200);

      expect(response.body).toHaveProperty('success');
      expect(response.body.success).toBe(true);
    });
  });
});
