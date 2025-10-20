const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { generateResponse } = require('../services/openai');
const logger = require('../utils/logger');
const config = require('../utils/config');

const router = express.Router();

// In-memory session storage (in production, use Redis or database)
const sessions = new Map();

/**
 * POST /api/chat
 * Handle chat messages and generate AI responses
 */
router.post('/', async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'Message is required and must be a string'
      });
    }

    // Generate or retrieve session ID
    const currentSessionId = sessionId || uuidv4();

    // Get or create session
    if (!sessions.has(currentSessionId)) {
      sessions.set(currentSessionId, {
        id: currentSessionId,
        messages: [],
        createdAt: new Date(),
        lastActivity: new Date()
      });
    }

    const session = sessions.get(currentSessionId);
    session.lastActivity = new Date();

    // Add user message to session
    session.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    // Generate AI response
    const aiResponse = await generateResponse(message, currentSessionId, session.messages);

    // Add AI response to session
    session.messages.push({
      role: 'assistant',
      content: aiResponse.reply,
      timestamp: new Date()
    });

    // Log the interaction
    logger.info('Chat interaction', {
      sessionId: currentSessionId,
      messageLength: message.length,
      contactShared: aiResponse.contactShared,
      followupActions: aiResponse.followupActions
    });

    // Return response
    res.json({
      reply: aiResponse.reply,
      sessionId: currentSessionId,
      contactShared: aiResponse.contactShared,
      followupActions: aiResponse.followupActions
    });

  } catch (error) {
    logger.error('Error in chat endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process chat message'
    });
  }
});

/**
 * GET /api/chat/session/:sessionId
 * Get session history
 */
router.get('/session/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = sessions.get(sessionId);

    if (!session) {
      return res.status(404).json({
        error: 'Session not found',
        message: 'Session does not exist or has expired'
      });
    }

    res.json({
      sessionId: session.id,
      messages: session.messages,
      createdAt: session.createdAt,
      lastActivity: session.lastActivity
    });

  } catch (error) {
    logger.error('Error retrieving session:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve session'
    });
  }
});

/**
 * DELETE /api/chat/session/:sessionId
 * Clear session data
 */
router.delete('/session/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    
    if (sessions.has(sessionId)) {
      sessions.delete(sessionId);
      logger.info('Session cleared', { sessionId });
    }

    res.json({ success: true });

  } catch (error) {
    logger.error('Error clearing session:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to clear session'
    });
  }
});

module.exports = router;
