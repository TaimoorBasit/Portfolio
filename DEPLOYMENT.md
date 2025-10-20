# Deployment Guide

## Prerequisites

Before deploying, ensure you have:

1. **GitHub Repository**: Your code pushed to GitHub
2. **Database**: PostgreSQL database (Vercel Postgres, Supabase, or PlanetScale)
3. **Cloudinary Account**: For image/video storage
4. **OpenAI API Key**: For AI assistant functionality
5. **Email Service**: SMTP credentials (Gmail, SendGrid, etc.)

## Vercel Deployment

### Step 1: Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository and click "Import"

### Step 2: Configure Environment Variables

In the Vercel project settings, add these environment variables:

```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# NextAuth
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-random-secret-key

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Admin User
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=secure-admin-password
```

### Step 3: Database Setup

#### Option A: Vercel Postgres (Recommended)

1. In Vercel dashboard, go to "Storage"
2. Create a new Postgres database
3. Copy the connection string to `DATABASE_URL`

#### Option B: Supabase

1. Create account at [Supabase](https://supabase.com)
2. Create new project
3. Go to Settings > Database
4. Copy connection string to `DATABASE_URL`

### Step 4: Deploy

1. Click "Deploy" in Vercel dashboard
2. Wait for deployment to complete
3. Visit your deployed URL

### Step 5: Initialize Database

After deployment, run these commands locally or in Vercel CLI:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database
npx prisma db seed
```

## Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Go to Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Add to Vercel environment variables

## Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `https://your-domain.vercel.app/api/auth/callback/google`
6. Copy Client ID and Secret to Vercel

## OpenAI Setup

1. Sign up at [OpenAI](https://openai.com)
2. Go to API Keys section
3. Create new API key
4. Add to Vercel environment variables

## Email Setup (Gmail Example)

1. Enable 2-factor authentication on Gmail
2. Generate App Password:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate password for "Mail"
3. Use your Gmail address and app password in SMTP settings

## Post-Deployment

1. **Test Admin Access**: Visit `/admin` and sign in
2. **Create Content**: Add projects, reviews through admin panel
3. **Test Contact Form**: Submit test message
4. **Test AI Assistant**: Try the chat functionality
5. **Upload Files**: Test image/video uploads

## Custom Domain (Optional)

1. In Vercel dashboard, go to "Domains"
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` environment variable

## Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Database Monitoring**: Check your database provider's dashboard
- **Error Tracking**: Consider adding Sentry for error monitoring

## Troubleshooting

### Common Issues

1. **Database Connection**: Verify `DATABASE_URL` is correct
2. **Authentication**: Check `NEXTAUTH_SECRET` and `NEXTAUTH_URL`
3. **File Uploads**: Verify Cloudinary credentials
4. **Email**: Check SMTP settings and credentials

### Debug Mode

Add to environment variables for debugging:
```env
NODE_ENV=development
```

### Logs

Check Vercel function logs in the dashboard for API route errors.

## Security Checklist

- [ ] Strong `NEXTAUTH_SECRET` (32+ characters)
- [ ] Secure admin password
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Environment variables properly set
- [ ] Database access restricted
- [ ] API rate limiting enabled

## Performance Optimization

1. **Image Optimization**: Use Next.js Image component
2. **Database Indexing**: Add indexes for frequently queried fields
3. **Caching**: Implement Redis for session storage
4. **CDN**: Vercel automatically provides global CDN

## Backup Strategy

1. **Database Backups**: Regular automated backups
2. **Code Backups**: Git repository
3. **File Backups**: Cloudinary provides redundancy
4. **Environment Variables**: Document all settings

