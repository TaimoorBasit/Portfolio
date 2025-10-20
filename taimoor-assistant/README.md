# Taimoor Assistant

A production-ready AI-powered chat widget for Muhammad Taimoor's portfolio website. The assistant helps visitors learn about projects, services, and facilitates lead generation through intelligent conversations.

## 🚀 Features

- **AI-Powered Chat**: Intelligent responses using OpenAI GPT-3.5-turbo
- **Lead Capture**: Collect visitor information with consent
- **Contact Sharing**: Secure contact information sharing with confirmation
- **Project Showcase**: Display portfolio projects and technologies
- **Responsive Design**: Works on desktop and mobile devices
- **Session Management**: Persistent chat history in browser
- **Rate Limiting**: Prevents abuse with configurable limits
- **Email Notifications**: Automatic lead notifications via SMTP
- **Security**: No API keys exposed to frontend

## 📁 Project Structure

```
taimoor-assistant/
├── backend/                 # Node.js Express API server
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utilities and helpers
│   │   └── server.js       # Main server file
│   ├── config.example.json # Configuration template
│   ├── system_prompt.txt   # AI system prompt
│   └── package.json
├── frontend/               # React TypeScript frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Helper functions
│   └── package.json
├── docs/                   # Documentation
└── README.md
```

## 🛠 Technology Stack

### Backend
- **Node.js** + **Express** - Server framework
- **OpenAI API** - AI conversation engine
- **Nodemailer** - Email notifications
- **Winston** - Logging
- **Express Rate Limit** - Rate limiting
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** + **TypeScript** - UI framework
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- OpenAI API key
- SMTP email credentials (Gmail, SendGrid, etc.)

### 1. Clone and Setup

```bash
git clone <repository-url>
cd taimoor-assistant
```

### 2. Backend Setup

```bash
cd backend
npm install
cp env.example .env
```

Edit `.env` with your credentials:

```env
OPENAI_API_KEY=your_openai_api_key_here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here
CONTACT_EMAIL=hello@muhammadtaimoor.com
BOOKING_LINK=https://calendly.com/muhammadtaimoor
RATE_LIMIT_PER_MIN=10
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env.local`:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

Start the frontend:

```bash
npm start
```

### 4. Configuration

Copy and customize the configuration:

```bash
cp backend/config.example.json backend/config.json
```

Edit `backend/config.json` with your project details and contact information.

## 📋 API Endpoints

### Chat
- `POST /api/chat` - Send message to AI assistant
- `GET /api/chat/session/:sessionId` - Get session history
- `DELETE /api/chat/session/:sessionId` - Clear session

### Handoff
- `POST /api/handoff` - Submit lead information
- `GET /api/handoff/status` - Check service status

### Configuration
- `GET /api/config` - Get public configuration
- `GET /api/config/projects` - Get project showcase
- `GET /api/config/contact` - Get contact information

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `OPENAI_API_KEY` | OpenAI API key | Yes | - |
| `SMTP_HOST` | SMTP server host | Yes | - |
| `SMTP_PORT` | SMTP server port | Yes | 587 |
| `SMTP_USER` | SMTP username | Yes | - |
| `SMTP_PASS` | SMTP password | Yes | - |
| `CONTACT_EMAIL` | Contact email address | Yes | - |
| `BOOKING_LINK` | Calendly/booking link | Yes | - |
| `RATE_LIMIT_PER_MIN` | Rate limit per minute | No | 10 |
| `PORT` | Server port | No | 3001 |
| `CORS_ORIGIN` | Allowed CORS origin | No | http://localhost:3000 |

### Configuration File

Edit `backend/config.json`:

```json
{
  "assistantName": "Taimoor Assistant",
  "accentColor": "#8b5cf6",
  "bookingLink": "https://calendly.com/muhammadtaimoor",
  "contactEmail": "hello@muhammadtaimoor.com",
  "autoShareContact": false,
  "rateLimitPerMinute": 10,
  "projects": [
    {
      "id": "portfolio-website",
      "title": "Portfolio Website",
      "description": "Modern, responsive portfolio website",
      "technologies": ["React", "Next.js", "TypeScript"],
      "link": "https://muhammadtaimoor.com",
      "featured": true
    }
  ]
}
```

## 🚀 Deployment

### Backend Deployment (Heroku)

1. Create Heroku app:
```bash
heroku create taimoor-assistant-api
```

2. Set environment variables:
```bash
heroku config:set OPENAI_API_KEY=your_key
heroku config:set SMTP_HOST=smtp.gmail.com
heroku config:set SMTP_PORT=587
heroku config:set SMTP_USER=your_email
heroku config:set SMTP_PASS=your_password
heroku config:set CONTACT_EMAIL=hello@muhammadtaimoor.com
heroku config:set BOOKING_LINK=https://calendly.com/muhammadtaimoor
heroku config:set CORS_ORIGIN=https://your-frontend-domain.com
```

3. Deploy:
```bash
git subtree push --prefix backend heroku main
```

### Frontend Deployment (Vercel)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd frontend
vercel
```

3. Set environment variables in Vercel dashboard:
```
REACT_APP_API_URL=https://your-backend-domain.herokuapp.com/api
```

### Alternative: Render

1. Connect GitHub repository to Render
2. Set build command: `cd backend && npm install && npm start`
3. Set start command: `npm start`
4. Configure environment variables in Render dashboard

## 🧪 Testing

### Manual Testing

1. **UI Smoke Test**:
   - Load the website
   - Click the chat widget button
   - Verify welcome message and quick replies appear

2. **Chat Reply Test**:
   - Send "Show Projects"
   - Verify AI lists projects with links

3. **Contact Safe-Share Test**:
   - Ask "How can I contact Muhammad?"
   - Verify confirmation prompt appears
   - Confirm and verify contact snippet is shown

4. **Handoff Test**:
   - Say "I want a quote"
   - Fill out the handoff form
   - Verify success message and email notification

5. **Rate Limiting Test**:
   - Send 20 rapid requests
   - Verify 429 response after threshold

### Automated Testing

Run the test suite:

```bash
cd backend
npm test
```

## 🔒 Security Features

- **API Key Protection**: OpenAI keys never exposed to frontend
- **Rate Limiting**: Prevents abuse with configurable limits
- **Input Validation**: All inputs sanitized and validated
- **CORS Protection**: Configured for specific origins
- **PII Handling**: Personal data only stored with consent
- **Secure Headers**: Helmet.js for security headers

## 📊 Monitoring & Logging

- **Winston Logging**: Structured logging with rotation
- **Error Tracking**: Comprehensive error handling
- **Performance Monitoring**: Request timing and metrics
- **Lead Tracking**: All leads logged with timestamps

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support or questions:
- Email: hello@muhammadtaimoor.com
- Create an issue in the repository

## 🔄 Changelog

### v1.0.0
- Initial release
- AI-powered chat widget
- Lead capture and handoff
- Contact sharing with consent
- Project showcase
- Responsive design
- Rate limiting and security
- Email notifications
