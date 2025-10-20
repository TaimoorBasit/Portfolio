# Environment Variables Setup for Vercel Deployment

## Required Environment Variables:

1. **DATABASE_URL** - PostgreSQL connection string
   - Format: `postgresql://username:password@host:port/database`
   - Example: `postgresql://user:pass@db.example.com:5432/portfolio`

2. **NEXTAUTH_SECRET** - Random secret for NextAuth
   - Generate with: `openssl rand -base64 32`

3. **NEXTAUTH_URL** - Your Vercel deployment URL
   - Example: `https://your-app.vercel.app`

## Optional Environment Variables:

4. **GOOGLE_CLIENT_ID** - Google OAuth client ID
5. **GOOGLE_CLIENT_SECRET** - Google OAuth client secret
6. **CLOUDINARY_CLOUD_NAME** - Cloudinary cloud name
7. **CLOUDINARY_API_KEY** - Cloudinary API key
8. **CLOUDINARY_API_SECRET** - Cloudinary API secret
9. **OPENAI_API_KEY** - OpenAI API key
10. **SMTP_HOST** - SMTP server host
11. **SMTP_PORT** - SMTP server port
12. **SMTP_USER** - SMTP username
13. **SMTP_PASS** - SMTP password
14. **ADMIN_EMAIL** - Admin email address
15. **ADMIN_PASSWORD** - Admin password

## Database Setup:

For local development, you can use:
- PostgreSQL locally
- Or use a cloud PostgreSQL service like:
  - Supabase (Free tier available)
  - Neon (Free tier available)
  - Railway (Free tier available)
  - PlanetScale (Free tier available)

