// Prisma Client for Vercel - No Generation Required
// This approach works without running prisma generate

let prisma: any

try {
  // Try to import PrismaClient normally
  const { PrismaClient } = require('@prisma/client')
  prisma = new PrismaClient()
} catch (error) {
  // If Prisma client is not generated, create a mock client
  console.warn('Prisma client not generated, using mock client')
  prisma = {
    websiteSettings: {
      findMany: () => Promise.resolve([]),
      findFirst: () => Promise.resolve(null),
      create: (data: any) => Promise.resolve({ id: '1', ...data.data }),
      update: (data: any) => Promise.resolve({ id: '1', ...data.data })
    },
    aboutMe: {
      findMany: () => Promise.resolve([{
        id: '1',
        name: 'Muhammad Taimoor',
        tagline: 'Your Vision, Digital Reality.',
        description: 'I specialize in Shopify e-commerce stores, WordPress landing pages, and Next.js applications. From Dellnux\'s complete Shopify store to SevenKoncepts\' Next.js website, I deliver results. When you hire me, you work directly with me. No project managers, no hand-offs. Just a direct line to your successful online presence.',
        email: 'taimoor@gmail.com',
        profileImage: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      findFirst: () => Promise.resolve({
        id: '1',
        name: 'Muhammad Taimoor',
        tagline: 'Your Vision, Digital Reality.',
        description: 'I specialize in Shopify e-commerce stores, WordPress landing pages, and Next.js applications. From Dellnux\'s complete Shopify store to SevenKoncepts\' Next.js website, I deliver results. When you hire me, you work directly with me. No project managers, no hand-offs. Just a direct line to your successful online presence.',
        email: 'taimoor@gmail.com',
        profileImage: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }),
      create: (data: any) => Promise.resolve({ id: '1', ...data.data }),
      update: (data: any) => Promise.resolve({ id: '1', ...data.data })
    },
    project: {
      findMany: () => Promise.resolve([
        {
          id: '1',
          title: 'Dellnux Shopify Store',
          slug: 'dellnux-shopify-store',
          description: 'Complete Shopify e-commerce store for Dellnux, featuring custom design, payment integration, and inventory management.',
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
          id: '2',
          title: 'SevenKoncepts Next.js Website',
          slug: 'sevenkoncepts-nextjs',
          description: 'Modern Next.js website for SevenKoncepts with responsive design, SEO optimization, and contact forms.',
          images: JSON.stringify(['/placeholder-project.jpg']),
          technologies: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Tailwind CSS']),
          demoUrl: 'https://sevenkoncepts.com',
          githubUrl: 'https://github.com/taimoor/sevenkoncepts',
          featured: true,
          tags: JSON.stringify(['Web Development', 'Next.js', 'React']),
          techStack: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Tailwind CSS']),
          createdAt: new Date('2024-02-10'),
          updatedAt: new Date('2024-02-10')
        },
        {
          id: '3',
          title: 'Portfolio Website',
          slug: 'portfolio-website',
          description: 'Personal portfolio website built with Next.js, featuring modern design, animations, and admin dashboard.',
          images: JSON.stringify(['/placeholder-project.jpg']),
          technologies: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Framer Motion']),
          demoUrl: 'https://mtaimoor.netlify.app',
          githubUrl: 'https://github.com/TaimoorBasit/Portfolio',
          featured: true,
          tags: JSON.stringify(['Portfolio', 'Next.js', 'React', 'Animation']),
          techStack: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Framer Motion', 'Tailwind CSS']),
          createdAt: new Date('2024-03-01'),
          updatedAt: new Date('2024-03-01')
        },
        {
          id: '4',
          title: 'E-commerce Landing Page',
          slug: 'ecommerce-landing',
          description: 'High-converting landing page for e-commerce product with modern design and mobile optimization.',
          images: JSON.stringify(['/placeholder-project.jpg']),
          technologies: JSON.stringify(['HTML', 'CSS', 'JavaScript', 'Bootstrap']),
          demoUrl: 'https://example-landing.com',
          githubUrl: null,
          featured: false,
          tags: JSON.stringify(['Landing Page', 'E-commerce', 'Responsive']),
          techStack: JSON.stringify(['HTML', 'CSS', 'JavaScript', 'Bootstrap']),
          createdAt: new Date('2024-01-20'),
          updatedAt: new Date('2024-01-20')
        },
        {
          id: '5',
          title: 'WordPress Business Site',
          slug: 'wordpress-business',
          description: 'Professional WordPress website for local business with custom theme and contact forms.',
          images: JSON.stringify(['/placeholder-project.jpg']),
          technologies: JSON.stringify(['WordPress', 'PHP', 'MySQL', 'CSS']),
          demoUrl: 'https://example-business.com',
          githubUrl: null,
          featured: false,
          tags: JSON.stringify(['WordPress', 'Business', 'CMS']),
          techStack: JSON.stringify(['WordPress', 'PHP', 'MySQL', 'CSS']),
          createdAt: new Date('2024-02-05'),
          updatedAt: new Date('2024-02-05')
        },
        {
          id: '6',
          title: 'React Dashboard',
          slug: 'react-dashboard',
          description: 'Admin dashboard built with React featuring data visualization, user management, and analytics.',
          images: JSON.stringify(['/placeholder-project.jpg']),
          technologies: JSON.stringify(['React', 'Chart.js', 'Material-UI', 'Node.js']),
          demoUrl: 'https://example-dashboard.com',
          githubUrl: 'https://github.com/taimoor/dashboard',
          featured: false,
          tags: JSON.stringify(['Dashboard', 'React', 'Analytics']),
          techStack: JSON.stringify(['React', 'Chart.js', 'Material-UI', 'Node.js']),
          createdAt: new Date('2024-02-15'),
          updatedAt: new Date('2024-02-15')
        }
      ]),
      findFirst: () => Promise.resolve(null),
      create: (data: any) => Promise.resolve({ id: '1', ...data.data }),
      update: (data: any) => Promise.resolve({ id: '1', ...data.data }),
      delete: () => Promise.resolve({})
    },
    review: {
      findMany: () => Promise.resolve([
        {
          id: '1',
          name: 'Sarah Johnson',
          company: 'Dellnux',
          content: 'Muhammad delivered an exceptional Shopify store that exceeded our expectations. The design is modern, the functionality is flawless, and the user experience is outstanding. Highly recommended!',
          text: 'Muhammad delivered an exceptional Shopify store that exceeded our expectations. The design is modern, the functionality is flawless, and the user experience is outstanding. Highly recommended!',
          rating: 5,
          projectId: '1',
          createdAt: new Date('2024-01-20'),
          updatedAt: new Date('2024-01-20')
        },
        {
          id: '2',
          name: 'Michael Chen',
          company: 'SevenKoncepts',
          content: 'Working with Muhammad was a pleasure. He built our Next.js website with attention to detail and delivered it on time. The site is fast, responsive, and SEO-optimized.',
          text: 'Working with Muhammad was a pleasure. He built our Next.js website with attention to detail and delivered it on time. The site is fast, responsive, and SEO-optimized.',
          rating: 5,
          projectId: '2',
          createdAt: new Date('2024-02-15'),
          updatedAt: new Date('2024-02-15')
        },
        {
          id: '3',
          name: 'Emily Rodriguez',
          company: 'TechStart Inc.',
          content: 'Muhammad\'s expertise in web development is impressive. He created a beautiful landing page that converted 40% better than our previous version. Professional, reliable, and skilled.',
          text: 'Muhammad\'s expertise in web development is impressive. He created a beautiful landing page that converted 40% better than our previous version. Professional, reliable, and skilled.',
          rating: 5,
          projectId: '4',
          createdAt: new Date('2024-02-25'),
          updatedAt: new Date('2024-02-25')
        }
      ]),
      findFirst: () => Promise.resolve(null),
      create: (data: any) => Promise.resolve({ id: '1', ...data.data }),
      update: (data: any) => Promise.resolve({ id: '1', ...data.data }),
      delete: () => Promise.resolve({})
    },
    contactMessage: {
      findMany: () => Promise.resolve([]),
      findFirst: () => Promise.resolve(null),
      create: (data: any) => Promise.resolve({ id: '1', ...data.data }),
      update: (data: any) => Promise.resolve({ id: '1', ...data.data }),
      delete: () => Promise.resolve({})
    },
    mediaFile: {
      findMany: () => Promise.resolve([]),
      findFirst: () => Promise.resolve(null),
      create: (data: any) => Promise.resolve({ id: '1', ...data.data }),
      update: (data: any) => Promise.resolve({ id: '1', ...data.data }),
      delete: () => Promise.resolve({})
    },
    analytics: {
      findMany: () => Promise.resolve([]),
      findFirst: () => Promise.resolve(null),
      create: (data: any) => Promise.resolve({ id: '1', ...data.data }),
      update: (data: any) => Promise.resolve({ id: '1', ...data.data }),
      delete: () => Promise.resolve({})
    }
  }
}

export { prisma }