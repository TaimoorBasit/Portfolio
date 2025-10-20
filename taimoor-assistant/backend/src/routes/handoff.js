const express = require('express');
const { sendLeadEmail, sendConfirmationEmail } = require('../services/email');
const logger = require('../utils/logger');

const router = express.Router();

/**
 * POST /api/handoff
 * Handle lead capture and handoff to human
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, consent } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Name, email, and message are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format',
        message: 'Please provide a valid email address'
      });
    }

    // Validate consent
    if (!consent) {
      return res.status(400).json({
        error: 'Consent required',
        message: 'You must consent to share your information'
      });
    }

    // Prepare lead data
    const leadData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
      message: message.trim(),
      consent: Boolean(consent),
      timestamp: new Date(),
      source: 'taimoor-assistant'
    };

    // Send lead notification email
    const emailSent = await sendLeadEmail(leadData);
    
    if (!emailSent) {
      logger.error('Failed to send lead email', { leadEmail: email });
      return res.status(500).json({
        error: 'Email service error',
        message: 'Failed to send notification email. Please try again or contact directly.'
      });
    }

    // Send confirmation email to lead
    try {
      await sendConfirmationEmail(leadData);
    } catch (confirmationError) {
      logger.warn('Failed to send confirmation email', { 
        error: confirmationError.message, 
        leadEmail: email 
      });
      // Don't fail the request if confirmation email fails
    }

    // Log the lead capture
    logger.info('Lead captured successfully', {
      leadName: name,
      leadEmail: email,
      hasPhone: !!phone,
      messageLength: message.length,
      consent: true
    });

    // Return success response
    res.json({
      ok: true,
      message: 'Thank you! I\'ve forwarded your message to Muhammad. You should receive a confirmation email shortly.',
      leadId: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });

  } catch (error) {
    logger.error('Error in handoff endpoint:', error);
    res.status(500).json({
      ok: false,
      error: 'Internal server error',
      message: 'Failed to process your request. Please try again or contact directly.'
    });
  }
});

/**
 * GET /api/handoff/status
 * Check handoff service status
 */
router.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Handoff service is operational',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
