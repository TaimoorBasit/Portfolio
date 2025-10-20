import { neon } from '@netlify/neon'

// Initialize Neon client - automatically uses NETLIFY_DATABASE_URL
const sql = neon()

// Database helper functions using Neon
export const db = {
  // Projects
  async getProjects() {
    try {
      const projects = await sql`
        SELECT * FROM "Project" 
        ORDER BY "createdAt" DESC
      `
      return projects
    } catch (error) {
      console.error('Error fetching projects:', error)
      // Return fallback data if database fails
      return [
        {
          id: 'fallback-1',
          title: 'Dellnux Shopify Store',
          slug: 'dellnux-shopify-store',
          description: 'Complete Shopify e-commerce store for Dellnux, featuring custom design, payment integration, inventory management, and mobile optimization.',
          images: JSON.stringify(['/placeholder-project.jpg']),
          technologies: JSON.stringify(['Shopify', 'Liquid', 'JavaScript', 'CSS']),
          demoUrl: 'https://dellnux.com',
          githubUrl: null,
          featured: true,
          tags: JSON.stringify(['E-commerce', 'Shopify', 'Web Development']),
          techStack: JSON.stringify(['Shopify', 'Liquid', 'JavaScript', 'CSS']),
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-15')
        },
        {
          id: 'fallback-2',
          title: 'SevenKoncepts Next.js Website',
          slug: 'sevenkoncepts-nextjs',
          description: 'Modern Next.js website for SevenKoncepts with responsive design, SEO optimization, contact forms, and performance optimization.',
          images: JSON.stringify(['/placeholder-project.jpg']),
          technologies: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Tailwind CSS']),
          demoUrl: 'https://sevenkoncepts.com',
          githubUrl: 'https://github.com/taimoor/sevenkoncepts',
          featured: true,
          tags: JSON.stringify(['Web Development', 'Next.js', 'React', 'SEO']),
          techStack: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Tailwind CSS']),
          createdAt: new Date('2024-02-10'),
          updatedAt: new Date('2024-02-10')
        }
      ]
    }
  },

  async createProject(projectData: any) {
    try {
      const [project] = await sql`
        INSERT INTO "Project" (
          title, slug, description, images, technologies, 
          "demoUrl", "githubUrl", featured, tags, "techStack"
        ) VALUES (
          ${projectData.title}, ${projectData.slug}, ${projectData.description},
          ${JSON.stringify(projectData.images || ['/placeholder-project.jpg'])},
          ${JSON.stringify(projectData.technologies || [])},
          ${projectData.demoUrl}, ${projectData.githubUrl}, ${projectData.featured || false},
          ${JSON.stringify(projectData.tags || [])},
          ${JSON.stringify(projectData.techStack || [])}
        ) RETURNING *
      `
      return project
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
        FROM "Review" r
        LEFT JOIN "Project" p ON r."projectId" = p.id
        ORDER BY r."createdAt" DESC
      `
      return reviews
    } catch (error) {
      console.error('Error fetching reviews:', error)
      // Return fallback data if database fails
      return [
        {
          id: 'fallback-review-1',
          name: 'Sarah Johnson',
          company: 'Dellnux',
          content: 'Muhammad transformed our e-commerce vision into reality with the Dellnux Shopify store. The custom design perfectly captures our brand identity.',
          text: 'Muhammad transformed our e-commerce vision into reality with the Dellnux Shopify store. The custom design perfectly captures our brand identity.',
          rating: 5,
          projectId: 'fallback-1',
          project_title: 'Dellnux Shopify Store',
          project_slug: 'dellnux-shopify-store',
          createdAt: new Date('2024-01-20'),
          updatedAt: new Date('2024-01-20')
        },
        {
          id: 'fallback-review-2',
          name: 'Michael Chen',
          company: 'SevenKoncepts',
          content: 'Working with Muhammad on our Next.js website was an absolute pleasure. He delivered a modern, responsive site that loads incredibly fast.',
          text: 'Working with Muhammad on our Next.js website was an absolute pleasure. He delivered a modern, responsive site that loads incredibly fast.',
          rating: 5,
          projectId: 'fallback-2',
          project_title: 'SevenKoncepts Next.js Website',
          project_slug: 'sevenkoncepts-nextjs',
          createdAt: new Date('2024-02-15'),
          updatedAt: new Date('2024-02-15')
        }
      ]
    }
  },

  async createReview(reviewData: any) {
    try {
      const [review] = await sql`
        INSERT INTO "Review" (
          name, company, content, text, rating, "projectId"
        ) VALUES (
          ${reviewData.name}, ${reviewData.company}, ${reviewData.content},
          ${reviewData.text || reviewData.content}, ${reviewData.rating}, ${reviewData.projectId}
        ) RETURNING *
      `
      return review
    } catch (error) {
      console.error('Error creating review:', error)
      throw error
    }
  },

  // About Me
  async getAboutMe() {
    try {
      const [about] = await sql`
        SELECT * FROM "AboutMe" 
        ORDER BY "createdAt" DESC 
        LIMIT 1
      `
      return about
    } catch (error) {
      console.error('Error fetching about me:', error)
      // Return fallback data if database fails
      return {
        id: 'fallback-about',
        name: 'Muhammad Taimoor',
        tagline: 'Your Vision, Digital Reality.',
        description: 'I specialize in Shopify e-commerce stores, WordPress landing pages, and Next.js applications. From Dellnux\'s complete Shopify store to SevenKoncepts\' Next.js website, I deliver results.',
        email: 'taimoor@gmail.com',
        profileImage: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }
  },

  async updateAboutMe(aboutData: any) {
    try {
      // Check if about data exists
      const existing = await sql`SELECT id FROM "AboutMe" LIMIT 1`
      
      if (existing.length > 0) {
        // Update existing
        const [about] = await sql`
          UPDATE "AboutMe" SET
            name = ${aboutData.name},
            tagline = ${aboutData.tagline},
            description = ${aboutData.description},
            email = ${aboutData.email},
            "profileImage" = ${aboutData.profileImage},
            "updatedAt" = NOW()
          WHERE id = ${existing[0].id}
          RETURNING *
        `
        return about
      } else {
        // Create new
        const [about] = await sql`
          INSERT INTO "AboutMe" (
            name, tagline, description, email, "profileImage"
          ) VALUES (
            ${aboutData.name}, ${aboutData.tagline}, ${aboutData.description},
            ${aboutData.email}, ${aboutData.profileImage}
          ) RETURNING *
        `
        return about
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
        SELECT * FROM "ContactMessage" 
        ORDER BY "createdAt" DESC
      `
      return messages
    } catch (error) {
      console.error('Error fetching contact messages:', error)
      return []
    }
  },

  async createContactMessage(messageData: any) {
    try {
      const [message] = await sql`
        INSERT INTO "ContactMessage" (
          name, email, subject, message, read
        ) VALUES (
          ${messageData.name}, ${messageData.email}, ${messageData.subject},
          ${messageData.message}, ${messageData.read || false}
        ) RETURNING *
      `
      return message
    } catch (error) {
      console.error('Error creating contact message:', error)
      throw error
    }
  }
}

export default db
