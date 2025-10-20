# Portfolio Application

A full-stack portfolio application built with Next.js, TypeScript, and PostgreSQL.

## Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js with credentials and Google OAuth
- **Database**: PostgreSQL with Prisma ORM
- **File Uploads**: Cloudinary integration for images and videos
- **AI Assistant**: OpenAI integration for chat functionality
- **Admin Panel**: Complete CRUD operations for projects, reviews, and messages
- **Responsive Design**: Mobile-first design with Framer Motion animations
- **Email Notifications**: Nodemailer for contact form submissions

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **File Storage**: Cloudinary
- **Email**: Nodemailer
- **AI**: OpenAI API
- **Testing**: Jest, React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Cloudinary account
- OpenAI API key
- SMTP email service

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

Fill in the required environment variables in `.env.local`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Email (Nodemailer)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Admin User (for initial setup)
ADMIN_EMAIL="taimoor@portfolio.com"
ADMIN_PASSWORD="admin123"
```

4. Set up the database:
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
portfolio-app/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   └── ...                # Feature components
├── lib/                    # Utility functions
├── prisma/                 # Database schema and migrations
├── __tests__/              # Test files
└── ...                     # Configuration files
```

## API Routes

- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Create new project (admin only)
- `GET /api/projects/[id]` - Fetch single project
- `PUT /api/projects/[id]` - Update project (admin only)
- `DELETE /api/projects/[id]` - Delete project (admin only)
- `GET /api/reviews` - Fetch all reviews
- `POST /api/reviews` - Create new review (admin only)
- `PUT /api/reviews/[id]` - Update review (admin only)
- `DELETE /api/reviews/[id]` - Delete review (admin only)
- `POST /api/contact` - Submit contact form
- `POST /api/ai` - AI assistant chat
- `POST /api/uploads` - File upload to Cloudinary

## Database Schema

### Models

- **User**: Admin users with authentication
- **Project**: Portfolio projects with images, videos, and metadata
- **Review**: Client reviews with ratings
- **ContactMessage**: Contact form submissions

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Database Setup

For production, use a managed PostgreSQL service:

**Recommended**: 
- [Vercel Postgres](https://vercel.com/storage/postgres)
- [Supabase](https://supabase.com)
- [PlanetScale](https://planetscale.com)

### Environment Variables for Production

Set these in your deployment platform:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-secret"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
OPENAI_API_KEY="your-openai-key"
SMTP_HOST="your-smtp-host"
SMTP_PORT="587"
SMTP_USER="your-email"
SMTP_PASS="your-password"
```

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

