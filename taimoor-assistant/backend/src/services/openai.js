const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Load system prompt
let systemPrompt = '';
try {
  const promptPath = path.join(__dirname, '../../system_prompt.txt');
  systemPrompt = fs.readFileSync(promptPath, 'utf8');
} catch (error) {
  logger.error('Error loading system prompt:', error);
  systemPrompt = 'You are Taimoor Assistant, an AI assistant for the portfolio of Muhammad Taimoor.';
}

/**
 * Generate AI response for chat message
 * @param {string} message - User message
 * @param {string} sessionId - Session ID for context
 * @param {Array} messageHistory - Previous messages in session
 * @returns {Promise<Object>} AI response with reply and metadata
 */
async function generateResponse(message, sessionId, messageHistory = []) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      logger.warn('OpenAI API key not configured, returning mock response');
      return {
        reply: "Demo mode. Contact: hello@muhammadtaimoor.com. Need more info? Type 'end chat' to close.",
        contactShared: false,
        followupActions: ['contact', 'handoff']
      };
    }

    // Build conversation history
    const messages = [
      { role: 'system', content: systemPrompt },
      ...messageHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 100, // Very short responses
      temperature: 0.3, // Lower temperature for more focused responses
      presence_penalty: 0.2,
      frequency_penalty: 0.2
    });

    const reply = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';

    // Check if contact was shared (simple keyword detection)
    const contactShared = reply.includes('hello@muhammadtaimoor.com') || 
                         reply.includes('+92-XXX-XXXXXXX') || 
                         reply.includes('calendly.com/muhammadtaimoor');

    // Determine follow-up actions
    const followupActions = [];
    if (reply.toLowerCase().includes('contact') || reply.toLowerCase().includes('email')) {
      followupActions.push('contact');
    }
    if (reply.toLowerCase().includes('book') || reply.toLowerCase().includes('meeting')) {
      followupActions.push('booking');
    }
    if (reply.toLowerCase().includes('forward') || reply.toLowerCase().includes('handoff')) {
      followupActions.push('handoff');
    }

    // Log the interaction
    logger.info('AI response generated', {
      sessionId,
      messageLength: message.length,
      replyLength: reply.length,
      contactShared,
      followupActions
    });

    return {
      reply,
      contactShared,
      followupActions
    };

  } catch (error) {
    logger.error('Error generating AI response:', error);
    return {
      reply: "Error occurred. Contact: hello@muhammadtaimoor.com. Need more info? Type 'end chat' to close.",
      contactShared: false,
      followupActions: ['contact']
    };
  }
}

module.exports = {
  generateResponse
};
