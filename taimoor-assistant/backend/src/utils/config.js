const fs = require('fs');
const path = require('path');

// Load configuration from file
let config = {};

try {
  const configPath = path.join(__dirname, '../../config.json');
  if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } else {
    // Fallback to example config
    const exampleConfigPath = path.join(__dirname, '../../config.example.json');
    config = JSON.parse(fs.readFileSync(exampleConfigPath, 'utf8'));
  }
} catch (error) {
  console.error('Error loading config:', error);
  // Use default config
  config = {
    assistantName: 'Taimoor Assistant',
    accentColor: '#8b5cf6',
    bookingLink: 'https://calendly.com/muhammadtaimoor',
    contactEmail: 'hello@muhammadtaimoor.com',
    autoShareContact: false,
    rateLimitPerMinute: 10,
    projects: []
  };
}

// Override with environment variables
config.contactEmail = process.env.CONTACT_EMAIL || config.contactEmail;
config.bookingLink = process.env.BOOKING_LINK || config.bookingLink;
config.autoShareContact = process.env.AUTO_SHARE_CONTACT === 'true' || config.autoShareContact;

module.exports = config;
