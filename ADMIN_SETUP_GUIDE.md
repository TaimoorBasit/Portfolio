# Admin Dashboard Setup Guide for Netlify

## 🔐 **Admin Login Credentials**

After deploying to Netlify, you can login to the admin dashboard using these credentials:

### **Default Credentials:**
- **Email:** `admin@portfolio.com`
- **Password:** `admin123`

### **Custom Credentials (Recommended):**
Set these environment variables in your Netlify dashboard:
- `ADMIN_EMAIL` = Your preferred admin email
- `ADMIN_PASSWORD` = Your preferred admin password

## 🛠️ **Setting Up Environment Variables on Netlify**

1. **Go to your Netlify Dashboard**
2. **Select your site**
3. **Go to Site Settings → Environment Variables**
4. **Add these variables:**

```
NEXTAUTH_URL=https://your-site-name.netlify.app
NEXTAUTH_SECRET=your-secret-key-here-minimum-32-characters
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123
DATABASE_URL=postgresql://username:password@host:port/database
```

## 📝 **How to Add Projects and Testimonials**

### **Step 1: Access Admin Dashboard**
1. Go to `https://your-site.netlify.app/admin/signin`
2. Login with your admin credentials
3. You'll see the admin dashboard with statistics

### **Step 2: Add New Projects**
1. **Click "Manage Projects"** or go to `/admin/projects`
2. **Click "Add New Project"** button
3. **Fill in the project details:**
   - **Title:** Project name (e.g., "E-commerce Store")
   - **Slug:** URL-friendly version (e.g., "ecommerce-store")
   - **Description:** Detailed project description
   - **Technologies:** Comma-separated list (e.g., "React, Node.js, MongoDB")
   - **Demo URL:** Live project URL
   - **GitHub URL:** Repository URL (optional)
   - **Featured:** Check if you want it featured
   - **Tags:** Comma-separated tags (e.g., "Web App, E-commerce")

### **Step 3: Add New Testimonials**
1. **Click "Manage Reviews"** or go to `/admin/reviews`
2. **Click "Add New Review"** button
3. **Fill in the testimonial details:**
   - **Name:** Client's name
   - **Company:** Client's company
   - **Content:** The testimonial text
   - **Rating:** 1-5 stars
   - **Project:** Select which project this testimonial is for

### **Step 4: Manage About Me**
1. **Click "About Me"** or go to `/admin/about`
2. **Update your information:**
   - **Name:** Your full name
   - **Tagline:** Professional tagline
   - **Description:** About yourself
   - **Email:** Contact email
   - **Profile Image:** Upload your photo

## 🔧 **Troubleshooting**

### **If you can't login:**
1. **Check environment variables** are set correctly in Netlify
2. **Try the default credentials:** `admin@portfolio.com` / `admin123`
3. **Check Netlify function logs** for authentication errors
4. **Ensure NEXTAUTH_URL** matches your exact Netlify URL

### **If projects/testimonials don't save:**
1. **Check DATABASE_URL** is set correctly
2. **Verify database connection** in Netlify function logs
3. **Try refreshing the page** after adding content
4. **Check browser console** for any errors

### **If content doesn't appear on homepage:**
1. **Wait a few minutes** for Netlify to rebuild
2. **Check browser console** for API errors
3. **Verify API endpoints** are working: `/api/projects`, `/api/reviews`
4. **Clear browser cache** and refresh

## 📊 **Admin Dashboard Features**

- **Statistics Overview:** Total projects, reviews, messages, views
- **Project Management:** Add, edit, delete projects
- **Review Management:** Add, edit, delete testimonials
- **About Me Editor:** Update personal information
- **Message Center:** View contact form submissions
- **Analytics:** View website performance data
- **Media Library:** Manage uploaded files
- **Settings:** Configure website settings

## 🚀 **Quick Start Checklist**

- [ ] Set environment variables in Netlify
- [ ] Login to admin dashboard
- [ ] Add your first project
- [ ] Add your first testimonial
- [ ] Update About Me section
- [ ] Test the homepage to see your content
- [ ] Customize admin credentials for security

Your admin dashboard is now ready to use! 🎉
