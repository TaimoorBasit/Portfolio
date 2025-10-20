# Environment Variables for Vercel Deployment

## Required Environment Variables (Set these in Vercel Dashboard)

### 1. DATABASE_URL
- **Value**: Your PostgreSQL connection string
- **Example**: `postgresql://username:password@host:port/database`
- **How to get**: From Supabase/Neon/Railway dashboard

### 2. NEXTAUTH_SECRET
- **Value**: Random secret key
- **How to generate**: Run `openssl rand -base64 32` in terminal
- **Example**: `abc123def456ghi789jkl012mno345pqr678stu901vwx234yz`

### 3. NEXTAUTH_URL
- **Value**: Your Vercel app URL
- **Example**: `https://your-app-name.vercel.app`
- **Note**: Update this after deployment

### 4. ADMIN_EMAIL
- **Value**: Your admin email
- **Example**: `admin@example.com`

### 5. ADMIN_PASSWORD
- **Value**: Your admin password
- **Example**: `SecurePassword123!`

## Optional Environment Variables

### Google OAuth (for login)
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET

### Cloudinary (for image storage)
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET

### OpenAI (for AI features)
- OPENAI_API_KEY

### SMTP (for email)
- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASS

## How to Set Environment Variables in Vercel:

1. Go to your Vercel project dashboard
2. Click "Settings" tab
3. Click "Environment Variables" in sidebar
4. Add each variable with its value
5. Click "Save"
6. Redeploy your project

## Quick Setup Commands:

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Test database connection
npx prisma db push
```
