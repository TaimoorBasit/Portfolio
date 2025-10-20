# Netlify Deployment Guide

## Prerequisites
1. **Database**: Set up a PostgreSQL database (recommended: Neon, Supabase, or PlanetScale)
2. **Environment Variables**: Configure all required environment variables in Netlify

## Required Environment Variables

Add these environment variables in your Netlify site settings:

### Database
```
DATABASE_URL=postgresql://username:password@host:port/database
```

### NextAuth
```
NEXTAUTH_URL=https://your-site-name.netlify.app
NEXTAUTH_SECRET=your-secret-key-here
```

### Email (Optional)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Deployment Steps

1. **Connect Repository**: Connect your GitHub repository to Netlify
2. **Build Settings**: 
   - Build command: `npm run build`
   - Publish directory: `.next`
3. **Environment Variables**: Add all required environment variables
4. **Deploy**: Netlify will automatically deploy using the Next.js plugin

## Important Notes

- **No netlify.toml needed**: Netlify's Next.js plugin handles everything automatically
- **API Routes**: Will work as serverless functions
- **Database**: Ensure your database allows connections from Netlify's IP ranges
- **Prisma**: Will be generated automatically during build

## Troubleshooting

If you get 500 errors:
1. Check environment variables are set correctly
2. Ensure DATABASE_URL is accessible from Netlify
3. Check Netlify function logs for specific errors
4. Verify Prisma client is generated properly
