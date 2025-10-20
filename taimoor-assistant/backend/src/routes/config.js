const express = require('express');
const config = require('../utils/config');
const logger = require('../utils/logger');

const router = express.Router();

/**
 * GET /api/config
 * Return sanitized public configuration
 */
router.get('/', (req, res) => {
  try {
    // Return only public configuration (no sensitive data)
    const publicConfig = {
      assistantName: config.assistantName,
      accentColor: config.accentColor,
      bookingLink: config.bookingLink,
      projects: config.projects || [],
      features: {
        chat: true,
        handoff: true,
        contactSharing: true,
        projectShowcase: true
      },
      ui: {
        theme: 'dark',
        primaryColor: config.accentColor,
        borderRadius: 'rounded-full',
        animation: true
      }
    };

    logger.info('Config requested', { 
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json(publicConfig);

  } catch (error) {
    logger.error('Error retrieving config:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve configuration'
    });
  }
});

/**
 * GET /api/config/projects
 * Return project showcase data
 */
router.get('/projects', (req, res) => {
  try {
    const projects = config.projects || [];
    
    // Filter to only featured projects if requested
    const featuredOnly = req.query.featured === 'true';
    const filteredProjects = featuredOnly 
      ? projects.filter(project => project.featured)
      : projects;

    res.json({
      projects: filteredProjects,
      total: filteredProjects.length
    });

  } catch (error) {
    logger.error('Error retrieving projects:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve projects'
    });
  }
});

/**
 * GET /api/config/contact
 * Return contact information (only if explicitly requested)
 */
router.get('/contact', (req, res) => {
  try {
    // This endpoint should only be called after user consent
    const contactInfo = {
      email: config.contactEmail,
      bookingLink: config.bookingLink,
      phone: '+92-XXX-XXXXXXX', // Masked for privacy
      website: 'https://muhammadtaimoor.com'
    };

    logger.info('Contact info requested', { 
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json(contactInfo);

  } catch (error) {
    logger.error('Error retrieving contact info:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve contact information'
    });
  }
});

module.exports = router;
