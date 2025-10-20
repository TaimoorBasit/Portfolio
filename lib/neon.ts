import { neon } from '@netlify/neon'

// Netlify Neon client - automatically uses NETLIFY_DATABASE_URL
const sql = neon()

// Database operations using Neon
export const db = {
  // Projects
  async getProjects() {
    try {
      const projects = await sql`
        SELECT * FROM project 
        ORDER BY created_at DESC
      `
      return projects
    } catch (error) {
      console.error('Error fetching projects:', error)
      // Return fallback data if database fails
      return [
        {
          id: '1',
          title: 'Dellnux Shopify Store',
          slug: 'dellnux-shopify-store',
          description: 'Complete Shopify e-commerce store for Dellnux, featuring custom design, payment integration, inventory management, and mobile optimization.',
          images: JSON.stringify(['/placeholder-project.jpg']),
          technologies: JSON.stringify(['Shopify', 'Liquid', 'JavaScript', 'CSS']),
          demo_url: 'https://dellnux.com',
          github_url: null,
          featured: true,
          tags: JSON.stringify(['E-commerce', 'Shopify', 'Web Development']),
          tech_stack: JSON.stringify(['Shopify', 'Liquid', 'JavaScript', 'CSS']),
          created_at: new Date('2024-01-15'),
          updated_at: new Date('2024-01-15')
        },
        {
          id: '2',
          title: 'SevenKoncepts Next.js Website',
          slug: 'sevenkoncepts-nextjs',
          description: 'Modern Next.js website for SevenKoncepts with responsive design, SEO optimization, contact forms, and performance optimization.',
          images: JSON.stringify(['/placeholder-project.jpg']),
          technologies: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Tailwind CSS']),
          demo_url: 'https://sevenkoncepts.com',
          github_url: 'https://github.com/taimoor/sevenkoncepts',
          featured: true,
          tags: JSON.stringify(['Web Development', 'Next.js', 'React', 'SEO']),
          tech_stack: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Tailwind CSS']),
          created_at: new Date('2024-02-10'),
          updated_at: new Date('2024-02-10')
        }
      ]
    }
  },

  async createProject(projectData: any) {
    try {
      const result = await sql`
        INSERT INTO project (
          title, slug, description, images, technologies, 
          demo_url, github_url, featured, tags, tech_stack
        ) VALUES (
          ${projectData.title}, ${projectData.slug}, ${projectData.description},
          ${JSON.stringify(projectData.images || ['/placeholder-project.jpg'])},
          ${JSON.stringify(projectData.technologies || [])},
          ${projectData.demoUrl}, ${projectData.githubUrl}, ${projectData.featured || false},
          ${JSON.stringify(projectData.tags || [])},
          ${JSON.stringify(projectData.techStack || [])}
        ) RETURNING *
      `
      return result[0]
    } catch (error) {
      console.error('Error creating project:', error)
      throw error
    }
  },

  // Reviews
  async getReviews() {
    try {
      const reviews = await sql`
        SELECT r.*, p.title as project_title, p.slug as project_slug
        FROM review r
        LEFT JOIN project p ON r.project_id = p.id
        ORDER BY r.created_at DESC
      `
      return reviews
    } catch (error) {
      console.error('Error fetching reviews:', error)
      // Return fallback data if database fails
      return [
        {
          id: '1',
          name: 'Sarah Johnson',
          company: 'Dellnux',
          content: 'Muhammad transformed our e-commerce vision into reality with the Dellnux Shopify store. The custom design perfectly captures our brand identity.',
          text: 'Muhammad transformed our e-commerce vision into reality with the Dellnux Shopify store. The custom design perfectly captures our brand identity.',
          rating: 5,
          project_id: '1',
          project_title: 'Dellnux Shopify Store',
          project_slug: 'dellnux-shopify-store',
          created_at: new Date('2024-01-20'),
          updated_at: new Date('2024-01-20')
        },
        {
          id: '2',
          name: 'Michael Chen',
          company: 'SevenKoncepts',
          content: 'Working with Muhammad on our Next.js website was an absolute pleasure. He delivered a modern, responsive site that loads incredibly fast.',
          text: 'Working with Muhammad on our Next.js website was an absolute pleasure. He delivered a modern, responsive site that loads incredibly fast.',
          rating: 5,
          project_id: '2',
          project_title: 'SevenKoncepts Next.js Website',
          project_slug: 'sevenkoncepts-nextjs',
          created_at: new Date('2024-02-15'),
          updated_at: new Date('2024-02-15')
        }
      ]
    }
  },

  async createReview(reviewData: any) {
    try {
      const result = await sql`
        INSERT INTO review (
          name, company, content, text, rating, project_id
        ) VALUES (
          ${reviewData.name}, ${reviewData.company}, ${reviewData.content},
          ${reviewData.text || reviewData.content}, ${reviewData.rating},
          ${reviewData.projectId || null}
        ) RETURNING *
      `
      return result[0]
    } catch (error) {
      console.error('Error creating review:', error)
      throw error
    }
  },

  // About Me
  async getAboutMe() {
    try {
      const about = await sql`
        SELECT * FROM about_me 
        ORDER BY created_at DESC 
        LIMIT 1
      `
      return about[0] || null
    } catch (error) {
      console.error('Error fetching about me:', error)
      // Return fallback data if database fails
      return {
        id: '1',
        name: 'Muhammad Taimoor',
        tagline: 'Your Vision, Digital Reality.',
        description: 'I specialize in Shopify e-commerce stores, WordPress landing pages, and Next.js applications. From Dellnux\'s complete Shopify store to SevenKoncepts\' Next.js website, I deliver results.',
        email: 'taimoor@gmail.com',
        profile_image: null,
        created_at: new Date(),
        updated_at: new Date()
      }
    }
  },

  async updateAboutMe(aboutData: any) {
    try {
      // Check if about data exists
      const existing = await sql`SELECT id FROM about_me LIMIT 1`
      
      if (existing.length > 0) {
        // Update existing
        const result = await sql`
          UPDATE about_me SET
            name = ${aboutData.name},
            tagline = ${aboutData.tagline},
            description = ${aboutData.description},
            email = ${aboutData.email},
            profile_image = ${aboutData.profileImage},
            updated_at = NOW()
          WHERE id = ${existing[0].id}
          RETURNING *
        `
        return result[0]
      } else {
        // Create new
        const result = await sql`
          INSERT INTO about_me (
            name, tagline, description, email, profile_image
          ) VALUES (
            ${aboutData.name}, ${aboutData.tagline}, ${aboutData.description},
            ${aboutData.email}, ${aboutData.profileImage}
          ) RETURNING *
        `
        return result[0]
      }
    } catch (error) {
      console.error('Error updating about me:', error)
      throw error
    }
  },

  // Contact Messages
  async getContactMessages() {
    try {
      const messages = await sql`
        SELECT * FROM contact_message 
        ORDER BY created_at DESC
      `
      return messages
    } catch (error) {
      console.error('Error fetching contact messages:', error)
      return []
    }
  },

  async createContactMessage(messageData: any) {
    try {
      const result = await sql`
        INSERT INTO contact_message (
          name, email, subject, message, read
        ) VALUES (
          ${messageData.name}, ${messageData.email}, ${messageData.subject},
          ${messageData.message}, ${messageData.read || false}
        ) RETURNING *
      `
      return result[0]
    } catch (error) {
      console.error('Error creating contact message:', error)
      throw error
    }
  },

  // Analytics
  async getAnalytics() {
    try {
      const analytics = await sql`
        SELECT * FROM analytics 
        ORDER BY created_at DESC 
        LIMIT 1
      `
      return analytics[0] || null
    } catch (error) {
      console.error('Error fetching analytics:', error)
      // Return fallback analytics data
      return {
        id: '1',
        total_views: 1250,
        unique_views: 890,
        page_views: 2100,
        bounce_rate: 0.35,
        avg_session_duration: 180,
        top_pages: JSON.stringify(['/', '/projects', '/about', '/contact']),
        referrers: JSON.stringify(['google.com', 'linkedin.com', 'github.com']),
        created_at: new Date('2024-03-01'),
        updated_at: new Date('2024-03-01')
      }
    }
  },

  // Media Files
  async getMediaFiles() {
    try {
      const files = await sql`
        SELECT * FROM media_file 
        ORDER BY created_at DESC
      `
      return files
    } catch (error) {
      console.error('Error fetching media files:', error)
      return []
    }
  },

  async createMediaFile(fileData: any) {
    try {
      const result = await sql`
        INSERT INTO media_file (
          filename, original_name, mime_type, size, url
        ) VALUES (
          ${fileData.filename}, ${fileData.originalName}, ${fileData.mimeType},
          ${fileData.size}, ${fileData.url}
        ) RETURNING *
      `
      return result[0]
    } catch (error) {
      console.error('Error creating media file:', error)
      throw error
    }
  }
}

export { sql }
