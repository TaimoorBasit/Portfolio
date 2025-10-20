# Neon Database Setup Guide for Netlify

## 🚀 **Setting Up Neon Database**

### **Step 1: Create Neon Database**
1. **Go to [neon.tech](https://neon.tech)**
2. **Sign up/Login** with your account
3. **Create a new project**
4. **Copy the connection string** (it looks like: `postgresql://username:password@host:port/database`)

### **Step 2: Set Up Database Tables**
Run these SQL commands in your Neon SQL editor:

```sql
-- Create Project table
CREATE TABLE "Project" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    images TEXT, -- JSON string
    technologies TEXT, -- JSON string
    "demoUrl" TEXT,
    "githubUrl" TEXT,
    featured BOOLEAN DEFAULT false,
    tags TEXT, -- JSON string
    "techStack" TEXT, -- JSON string
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create Review table
CREATE TABLE "Review" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    company TEXT,
    content TEXT NOT NULL,
    text TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    "projectId" TEXT REFERENCES "Project"(id),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create AboutMe table
CREATE TABLE "AboutMe" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    email TEXT,
    "profileImage" TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create ContactMessage table
CREATE TABLE "ContactMessage" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create User table for authentication
CREATE TABLE "User" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    "passwordHash" TEXT,
    role TEXT DEFAULT 'admin',
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Insert sample data
INSERT INTO "Project" (title, slug, description, images, technologies, "demoUrl", "githubUrl", featured, tags, "techStack") VALUES
('Dellnux Shopify Store', 'dellnux-shopify-store', 'Complete Shopify e-commerce store for Dellnux, featuring custom design, payment integration, inventory management, and mobile optimization.', '["/placeholder-project.jpg"]', '["Shopify", "Liquid", "JavaScript", "CSS"]', 'https://dellnux.com', null, true, '["E-commerce", "Shopify", "Web Development"]', '["Shopify", "Liquid", "JavaScript", "CSS"]'),
('SevenKoncepts Next.js Website', 'sevenkoncepts-nextjs', 'Modern Next.js website for SevenKoncepts with responsive design, SEO optimization, contact forms, and performance optimization.', '["/placeholder-project.jpg"]', '["Next.js", "React", "TypeScript", "Tailwind CSS"]', 'https://sevenkoncepts.com', 'https://github.com/taimoor/sevenkoncepts', true, '["Web Development", "Next.js", "React", "SEO"]', '["Next.js", "React", "TypeScript", "Tailwind CSS"]');

INSERT INTO "Review" (name, company, content, text, rating, "projectId") VALUES
('Sarah Johnson', 'Dellnux', 'Muhammad transformed our e-commerce vision into reality with the Dellnux Shopify store. The custom design perfectly captures our brand identity.', 'Muhammad transformed our e-commerce vision into reality with the Dellnux Shopify store. The custom design perfectly captures our brand identity.', 5, (SELECT id FROM "Project" WHERE slug = 'dellnux-shopify-store')),
('Michael Chen', 'SevenKoncepts', 'Working with Muhammad on our Next.js website was an absolute pleasure. He delivered a modern, responsive site that loads incredibly fast.', 'Working with Muhammad on our Next.js website was an absolute pleasure. He delivered a modern, responsive site that loads incredibly fast.', 5, (SELECT id FROM "Project" WHERE slug = 'sevenkoncepts-nextjs'));

INSERT INTO "AboutMe" (name, tagline, description, email) VALUES
('Muhammad Taimoor', 'Your Vision, Digital Reality.', 'I specialize in Shopify e-commerce stores, WordPress landing pages, and Next.js applications. From Dellnux''s complete Shopify store to SevenKoncepts'' Next.js website, I deliver results.', 'taimoor@gmail.com');
```

### **Step 3: Set Environment Variables in Netlify**
1. **Go to Netlify Dashboard** → Your Site → **Site Settings** → **Environment Variables**
2. **Add these variables:**

```
NETLIFY_DATABASE_URL=postgresql://username:password@host:port/database
NEXTAUTH_URL=https://your-site-name.netlify.app
NEXTAUTH_SECRET=d9459b5f88af593364fca8c024765774a1e866451a8dad88346957e208e03071
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123
```

### **Step 4: Deploy and Test**
1. **Commit and push** your changes
2. **Wait for Netlify deployment** to complete
3. **Test your site** - projects and testimonials should now appear!

## 🎯 **Benefits of Neon + Netlify**

- ✅ **Automatic connection** - No manual database setup
- ✅ **Serverless functions** work seamlessly
- ✅ **Automatic scaling** based on usage
- ✅ **Built-in connection pooling**
- ✅ **No cold start issues**

## 🔧 **Troubleshooting**

### **If projects/testimonials still don't show:**
1. **Check Neon SQL editor** - verify tables exist and have data
2. **Check Netlify function logs** for database connection errors
3. **Verify NETLIFY_DATABASE_URL** is set correctly
4. **Test API endpoints** directly: `/api/projects`, `/api/reviews`

### **If admin login doesn't work:**
1. **Use fallback credentials:** `admin@portfolio.com` / `admin123`
2. **Check NEXTAUTH_URL** matches your exact Netlify URL
3. **Verify NEXTAUTH_SECRET** is set

Your portfolio should now work perfectly with Neon database! 🚀
