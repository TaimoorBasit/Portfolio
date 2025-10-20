# Deployment Guide - Taimoor Assistant

This guide covers deploying the Taimoor Assistant to various platforms.

## 🚀 Quick Deployment Options

### Option 1: Vercel + Railway (Recommended)
- **Frontend**: Vercel (free tier)
- **Backend**: Railway (free tier)
- **Database**: Railway PostgreSQL (free tier)

### Option 2: Vercel + Render
- **Frontend**: Vercel (free tier)
- **Backend**: Render (free tier)
- **Database**: Render PostgreSQL (free tier)

### Option 3: Heroku + Vercel
- **Frontend**: Vercel (free tier)
- **Backend**: Heroku (paid after free tier)
- **Database**: Heroku Postgres (paid)

## 📋 Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] OpenAI API key obtained
- [ ] SMTP credentials ready
- [ ] Domain names registered (if using custom domains)
- [ ] SSL certificates ready (if using custom domains)
- [ ] Configuration file updated
- [ ] Tests passing locally

## 🔧 Environment Variables Reference

### Backend Environment Variables

```env
# Required
OPENAI_API_KEY=sk-...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=hello@muhammadtaimoor.com
BOOKING_LINK=https://calendly.com/muhammadtaimoor

# Optional
RATE_LIMIT_PER_MIN=10
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
LOG_LEVEL=info
```

### Frontend Environment Variables

```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## 🚀 Deployment Methods

### Method 1: Vercel + Railway

#### Step 1: Deploy Backend to Railway

1. **Create Railway Account**:
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select "backend" folder as root directory

3. **Configure Environment Variables**:
   - Go to project settings
   - Add all backend environment variables
   - Set `NODE_ENV=production`
   - Set `CORS_ORIGIN=https://your-frontend-domain.vercel.app`

4. **Deploy**:
   - Railway will automatically deploy
   - Note the generated domain (e.g., `https://your-app.railway.app`)

#### Step 2: Deploy Frontend to Vercel

1. **Create Vercel Account**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**:
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to "frontend"

3. **Configure Environment Variables**:
   - Go to project settings
   - Add `REACT_APP_API_URL=https://your-backend-domain.railway.app/api`

4. **Deploy**:
   - Vercel will automatically deploy
   - Note the generated domain (e.g., `https://your-app.vercel.app`)

5. **Update Backend CORS**:
   - Go back to Railway
   - Update `CORS_ORIGIN` to your Vercel domain

### Method 2: Vercel + Render

#### Step 1: Deploy Backend to Render

1. **Create Render Account**:
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Set root directory to "backend"
   - Set build command: `npm install`
   - Set start command: `npm start`

3. **Configure Environment Variables**:
   - Go to Environment tab
   - Add all backend environment variables
   - Set `NODE_ENV=production`

4. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note the generated domain

#### Step 2: Deploy Frontend to Vercel

Follow the same steps as Method 1, Step 2, but use your Render backend URL.

### Method 3: Heroku + Vercel

#### Step 1: Deploy Backend to Heroku

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create Heroku App**:
   ```bash
   heroku create taimoor-assistant-api
   ```

4. **Set Environment Variables**:
   ```bash
   heroku config:set OPENAI_API_KEY=your_key
   heroku config:set SMTP_HOST=smtp.gmail.com
   heroku config:set SMTP_PORT=587
   heroku config:set SMTP_USER=your_email
   heroku config:set SMTP_PASS=your_password
   heroku config:set CONTACT_EMAIL=hello@muhammadtaimoor.com
   heroku config:set BOOKING_LINK=https://calendly.com/muhammadtaimoor
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**:
   ```bash
   git subtree push --prefix backend heroku main
   ```

#### Step 2: Deploy Frontend to Vercel

Follow the same steps as Method 1, Step 2.

## 🔧 Configuration Updates

### Update Configuration File

1. **Copy example config**:
   ```bash
   cp backend/config.example.json backend/config.json
   ```

2. **Update with your details**:
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
         "description": "Modern, responsive portfolio website with dark theme and animations",
         "technologies": ["React", "Next.js", "TypeScript", "Tailwind CSS"],
         "link": "https://muhammadtaimoor.com",
         "featured": true
       }
     ]
   }
   ```

3. **Commit and push**:
   ```bash
   git add backend/config.json
   git commit -m "Update configuration"
   git push
   ```

## 🌐 Custom Domain Setup

### Frontend (Vercel)

1. **Add Domain**:
   - Go to Vercel project settings
   - Click "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Environment Variables**:
   - Update `REACT_APP_API_URL` if needed

### Backend (Railway/Render/Heroku)

1. **Add Custom Domain**:
   - Go to your platform's domain settings
   - Add your custom domain
   - Configure DNS records

2. **Update CORS**:
   - Update `CORS_ORIGIN` to your frontend domain

## 🔒 SSL/HTTPS Configuration

Most platforms provide SSL certificates automatically:

- **Vercel**: Automatic SSL
- **Railway**: Automatic SSL
- **Render**: Automatic SSL
- **Heroku**: Automatic SSL

## 📊 Monitoring & Logs

### Railway
- Go to project dashboard
- Click "Logs" tab
- View real-time logs

### Render
- Go to service dashboard
- Click "Logs" tab
- View application logs

### Heroku
```bash
heroku logs --tail --app taimoor-assistant-api
```

### Vercel
- Go to project dashboard
- Click "Functions" tab
- View function logs

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Check `CORS_ORIGIN` environment variable
   - Ensure it matches your frontend domain exactly

2. **API Not Responding**:
   - Check backend logs
   - Verify environment variables
   - Test API endpoints directly

3. **Email Not Working**:
   - Verify SMTP credentials
   - Check email provider settings
   - Test with a simple email

4. **Rate Limiting Too Strict**:
   - Adjust `RATE_LIMIT_PER_MIN` value
   - Check if IP is being blocked

5. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

### Debug Commands

```bash
# Test API locally
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'

# Check environment variables
heroku config --app taimoor-assistant-api

# View logs
heroku logs --tail --app taimoor-assistant-api
```

## 🔄 Updates & Maintenance

### Updating the Application

1. **Make changes locally**
2. **Test thoroughly**
3. **Commit and push to GitHub**
4. **Platforms will auto-deploy**

### Database Migrations

If using a database:
1. **Backup current data**
2. **Run migrations**
3. **Verify data integrity**

### Environment Variable Updates

1. **Update in platform dashboard**
2. **Restart the service**
3. **Verify changes took effect**

## 📈 Performance Optimization

### Backend
- Enable gzip compression
- Use CDN for static assets
- Implement caching where appropriate
- Monitor memory usage

### Frontend
- Enable Vercel's automatic optimizations
- Use image optimization
- Implement code splitting
- Monitor Core Web Vitals

## 🔐 Security Checklist

- [ ] All API keys secured
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation in place
- [ ] HTTPS enabled
- [ ] No sensitive data in logs
- [ ] Regular security updates

## 📞 Support

If you encounter deployment issues:

1. **Check platform documentation**
2. **Review error logs**
3. **Test locally first**
4. **Create an issue in the repository**
5. **Contact platform support if needed**

## 🎯 Post-Deployment Testing

After deployment, run through the testing checklist:

1. **Load the website**
2. **Test chat widget**
3. **Send test messages**
4. **Test contact sharing**
5. **Test handoff form**
6. **Verify email notifications**
7. **Test on mobile**
8. **Check performance**

Your Taimoor Assistant should now be live and ready to help visitors! 🚀
