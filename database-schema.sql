-- Neon Database Schema for Portfolio
-- Run this in your Neon database console

-- Projects table
CREATE TABLE IF NOT EXISTS project (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    images TEXT, -- JSON string
    technologies TEXT, -- JSON string
    demo_url VARCHAR(500),
    github_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    tags TEXT, -- JSON string
    tech_stack TEXT, -- JSON string
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS review (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    content TEXT NOT NULL,
    text TEXT, -- Same as content for compatibility
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    project_id INTEGER REFERENCES project(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- About Me table
CREATE TABLE IF NOT EXISTS about_me (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tagline VARCHAR(500),
    description TEXT,
    email VARCHAR(255),
    profile_image VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Contact Messages table
CREATE TABLE IF NOT EXISTS contact_message (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500),
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
    id SERIAL PRIMARY KEY,
    total_views INTEGER DEFAULT 0,
    unique_views INTEGER DEFAULT 0,
    page_views INTEGER DEFAULT 0,
    bounce_rate DECIMAL(3,2) DEFAULT 0.00,
    avg_session_duration INTEGER DEFAULT 0,
    top_pages TEXT, -- JSON string
    referrers TEXT, -- JSON string
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Media Files table
CREATE TABLE IF NOT EXISTS media_file (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100),
    size BIGINT,
    url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Users table (for admin authentication)
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    password_hash VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Website Settings table
CREATE TABLE IF NOT EXISTS website_settings (
    id SERIAL PRIMARY KEY,
    site_name VARCHAR(255),
    site_description TEXT,
    site_url VARCHAR(500),
    logo VARCHAR(500),
    favicon VARCHAR(500),
    primary_color VARCHAR(7),
    secondary_color VARCHAR(7),
    social_links TEXT, -- JSON string
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords TEXT,
    analytics_id VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    contact_address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample data
INSERT INTO project (title, slug, description, images, technologies, demo_url, github_url, featured, tags, tech_stack) VALUES
('Dellnux Shopify Store', 'dellnux-shopify-store', 'Complete Shopify e-commerce store for Dellnux, featuring custom design, payment integration, inventory management, and mobile optimization.', '["/placeholder-project.jpg"]', '["Shopify", "Liquid", "JavaScript", "CSS"]', 'https://dellnux.com', NULL, true, '["E-commerce", "Shopify", "Web Development"]', '["Shopify", "Liquid", "JavaScript", "CSS"]'),
('SevenKoncepts Next.js Website', 'sevenkoncepts-nextjs', 'Modern Next.js website for SevenKoncepts with responsive design, SEO optimization, contact forms, and performance optimization.', '["/placeholder-project.jpg"]', '["Next.js", "React", "TypeScript", "Tailwind CSS"]', 'https://sevenkoncepts.com', 'https://github.com/taimoor/sevenkoncepts', true, '["Web Development", "Next.js", "React", "SEO"]', '["Next.js", "React", "TypeScript", "Tailwind CSS"]'),
('Portfolio Website', 'portfolio-website', 'Personal portfolio website built with Next.js, featuring modern design, smooth animations, admin dashboard, and responsive layout.', '["/placeholder-project.jpg"]', '["Next.js", "React", "TypeScript", "Framer Motion"]', 'https://mtaimoor.netlify.app', 'https://github.com/TaimoorBasit/Portfolio', true, '["Portfolio", "Next.js", "React", "Animation"]', '["Next.js", "React", "TypeScript", "Framer Motion"]');

INSERT INTO review (name, company, content, text, rating, project_id) VALUES
('Sarah Johnson', 'Dellnux', 'Muhammad transformed our e-commerce vision into reality with the Dellnux Shopify store. The custom design perfectly captures our brand identity, and the seamless payment integration has increased our conversion rate by 35%.', 'Muhammad transformed our e-commerce vision into reality with the Dellnux Shopify store. The custom design perfectly captures our brand identity, and the seamless payment integration has increased our conversion rate by 35%.', 5, 1),
('Michael Chen', 'SevenKoncepts', 'Working with Muhammad on our Next.js website was an absolute pleasure. He delivered a modern, responsive site that loads incredibly fast and ranks perfectly on Google. The SEO optimization he implemented has increased our organic traffic by 60%.', 'Working with Muhammad on our Next.js website was an absolute pleasure. He delivered a modern, responsive site that loads incredibly fast and ranks perfectly on Google. The SEO optimization he implemented has increased our organic traffic by 60%.', 5, 2),
('Emily Rodriguez', 'TechStart Inc.', 'Muhammad''s expertise in web development is truly impressive. He created a stunning landing page for our product launch that converted 40% better than our previous version. The mobile optimization is flawless, and the user experience is smooth across all devices.', 'Muhammad''s expertise in web development is truly impressive. He created a stunning landing page for our product launch that converted 40% better than our previous version. The mobile optimization is flawless, and the user experience is smooth across all devices.', 5, 3);

INSERT INTO about_me (name, tagline, description, email) VALUES
('Muhammad Taimoor', 'Your Vision, Digital Reality.', 'I specialize in Shopify e-commerce stores, WordPress landing pages, and Next.js applications. From Dellnux''s complete Shopify store to SevenKoncepts'' Next.js website, I deliver results. When you hire me, you work directly with me. No project managers, no hand-offs. Just a direct line to your successful online presence.', 'taimoor@gmail.com');

INSERT INTO analytics (total_views, unique_views, page_views, bounce_rate, avg_session_duration, top_pages, referrers) VALUES
(1250, 890, 2100, 0.35, 180, '["/", "/projects", "/about", "/contact"]', '["google.com", "linkedin.com", "github.com"]');
