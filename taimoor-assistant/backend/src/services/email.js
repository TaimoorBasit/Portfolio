const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

// Create transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send lead notification email
 * @param {Object} leadData - Lead information
 * @returns {Promise<boolean>} Success status
 */
async function sendLeadEmail(leadData) {
  try {
    const { name, email, phone, message, consent } = leadData;

    const mailOptions = {
      from: `"Taimoor Assistant" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'hello@muhammadtaimoor.com',
      subject: `New Lead from Taimoor Assistant - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8b5cf6;">New Lead from Taimoor Assistant</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Lead Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Consent:</strong> ${consent ? 'Yes' : 'No'}</p>
          </div>

          <div style="background: #fff; padding: 20px; border-left: 4px solid #8b5cf6; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <div style="background: #e9ecef; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              <strong>Timestamp:</strong> ${new Date().toLocaleString()}<br>
              <strong>Source:</strong> Taimoor Assistant Chat Widget
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${email}" 
               style="background: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Reply to Lead
            </a>
          </div>
        </div>
      `,
      text: `
New Lead from Taimoor Assistant

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
Consent: ${consent ? 'Yes' : 'No'}

Message:
${message}

Timestamp: ${new Date().toLocaleString()}
Source: Taimoor Assistant Chat Widget
      `
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info('Lead email sent successfully', {
      messageId: info.messageId,
      leadEmail: email,
      leadName: name
    });

    return true;

  } catch (error) {
    logger.error('Error sending lead email:', error);
    return false;
  }
}

/**
 * Send confirmation email to lead
 * @param {Object} leadData - Lead information
 * @returns {Promise<boolean>} Success status
 */
async function sendConfirmationEmail(leadData) {
  try {
    const { name, email } = leadData;

    const mailOptions = {
      from: `"Muhammad Taimoor" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for your interest - Muhammad Taimoor',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8b5cf6;">Thank you for reaching out!</h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for your interest in my services. I've received your message and will get back to you within 24 hours.</p>
          
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Check out my <a href="https://muhammadtaimoor.com" style="color: #8b5cf6;">portfolio</a></li>
            <li>Book a <a href="https://calendly.com/muhammadtaimoor" style="color: #8b5cf6;">free consultation call</a></li>
            <li>Follow me on <a href="https://linkedin.com/in/muhammadtaimoor" style="color: #8b5cf6;">LinkedIn</a></li>
          </ul>
          
          <p>Best regards,<br>
          Muhammad Taimoor</p>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              <strong>Contact Information:</strong><br>
              Email: hello@muhammadtaimoor.com<br>
              Phone: +92-XXX-XXXXXXX<br>
              Website: https://muhammadtaimoor.com
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info('Confirmation email sent to lead', {
      messageId: info.messageId,
      leadEmail: email
    });

    return true;

  } catch (error) {
    logger.error('Error sending confirmation email:', error);
    return false;
  }
}

module.exports = {
  sendLeadEmail,
  sendConfirmationEmail
};
