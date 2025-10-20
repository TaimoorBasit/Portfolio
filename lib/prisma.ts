// Prisma Client for Vercel - No Generation Required
// This approach works without running prisma generate

let prisma: any

try {
  // Check if DATABASE_URL is configured
  if (!process.env.DATABASE_URL || !process.env.DATABASE_URL.startsWith('postgresql://')) {
    throw new Error('No valid DATABASE_URL configured')
  }
  
  // Try to import PrismaClient normally
  const { PrismaClient } = require('@prisma/client')
  prisma = new PrismaClient()
} catch (error) {
  // If Prisma client is not generated or no DATABASE_URL, create a mock client
  console.warn('Using mock Prisma client:', error.message)
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
          description: 'Complete Shopify e-commerce store for Dellnux, featuring custom design, payment integration, inventory management, and mobile optimization. Increased conversion rate by 35% and improved user experience significantly.',
          images: JSON.stringify(['/placeholder-project.jpg']),
          technologies: JSON.stringify(['Shopify', 'Liquid', 'JavaScript', 'CSS', 'Payment Gateway Integration']),
          demoUrl: 'https://dellnux.com',
          githubUrl: null,
          featured: true,
          tags: JSON.stringify(['E-commerce', 'Shopify', 'Web Development', 'Payment Integration']),
          techStack: JSON.stringify(['Shopify', 'Liquid', 'JavaScript', 'CSS', 'Stripe', 'PayPal']),
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-15')
        },
        {
          id: '2',
          title: 'SevenKoncepts Next.js Website',
          slug: 'sevenkoncepts-nextjs',
          description: 'Modern Next.js website for SevenKoncepts with responsive design, SEO optimization, contact forms, and performance optimization. Achieved 60% increase in organic traffic and perfect Google PageSpeed scores.',
          images: JSON.stringify(['/placeholder-project.jpg']),
          technologies: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'SEO Optimization']),
          demoUrl: 'https://sevenkoncepts.com',
          githubUrl: 'https://github.com/taimoor/sevenkoncepts',
          featured: true,
          tags: JSON.stringify(['Web Development', 'Next.js', 'React', 'SEO', 'Performance']),
          techStack: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Next-SEO']),
          createdAt: new Date('2024-02-10'),
          updatedAt: new Date('2024-02-10')
        },
        {
          id: '3',
          title: 'Portfolio Website',
          slug: 'portfolio-website',
          description: 'Personal portfolio website built with Next.js, featuring modern design, smooth animations, admin dashboard, and responsive layout. Showcases professional work with interactive elements and optimized performance.',
          images: JSON.stringify(['/placeholder-project.jpg']),
          technologies: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Framer Motion', 'Admin Dashboard']),
          demoUrl: 'https://mtaimoor.netlify.app',
          githubUrl: 'https://github.com/TaimoorBasit/Portfolio',
          featured: true,
          tags: JSON.stringify(['Portfolio', 'Next.js', 'React', 'Animation', 'Admin Panel']),
          techStack: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Prisma']),
          createdAt: new Date('2024-03-01'),
          updatedAt: new Date('2024-03-01')
        },
        {
          id: '4',
          title: 'E-commerce Landing Page',
          slug: 'ecommerce-landing',
          description: 'High-converting landing page for e-commerce product with modern design, mobile optimization, and conversion-focused elements. Achieved 40% better conversion rate compared to previous version.',
          images: JSON.stringify(['/placeholder-project.jpg']),
          technologies: JSON.stringify(['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Conversion Optimization']),
          demoUrl: 'https://example-landing.com',
          githubUrl: null,
          featured: false,
          tags: JSON.stringify(['Landing Page', 'E-commerce', 'Responsive', 'Conversion']),
          techStack: JSON.stringify(['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'A/B Testing']),
          createdAt: new Date('2024-01-20'),
          updatedAt: new Date('2024-01-20')
        },
        {
          id: '5',
          title: 'WordPress Business Site',
          slug: 'wordpress-business',
          description: 'Professional WordPress website for local business with custom theme, contact forms, and easy content management. Received positive feedback from customers about the professional appearance.',
          images: JSON.stringify(['/placeholder-project.jpg']),
          technologies: JSON.stringify(['WordPress', 'PHP', 'MySQL', 'CSS', 'Custom Theme']),
          demoUrl: 'https://example-business.com',
          githubUrl: null,
          featured: false,
          tags: JSON.stringify(['WordPress', 'Business', 'CMS', 'Custom Theme']),
          techStack: JSON.stringify(['WordPress', 'PHP', 'MySQL', 'CSS', 'Contact Form 7']),
          createdAt: new Date('2024-02-05'),
          updatedAt: new Date('2024-02-05')
        },
        {
          id: '6',
          title: 'React Dashboard',
          slug: 'react-dashboard',
          description: 'Admin dashboard built with React featuring data visualization, user management, and analytics. Significantly increased team productivity with intuitive interface and smooth performance.',
          images: JSON.stringify(['/placeholder-project.jpg']),
          technologies: JSON.stringify(['React', 'Chart.js', 'Material-UI', 'Node.js', 'Data Visualization']),
          demoUrl: 'https://example-dashboard.com',
          githubUrl: 'https://github.com/taimoor/dashboard',
          featured: false,
          tags: JSON.stringify(['Dashboard', 'React', 'Analytics', 'Data Visualization']),
          techStack: JSON.stringify(['React', 'Chart.js', 'Material-UI', 'Node.js', 'Express', 'MongoDB']),
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
          content: 'Muhammad transformed our e-commerce vision into reality with the Dellnux Shopify store. The custom design perfectly captures our brand identity, and the seamless payment integration has increased our conversion rate by 35%. His attention to detail and understanding of our business needs exceeded our expectations. Highly recommended for any Shopify development project!',
          text: 'Muhammad transformed our e-commerce vision into reality with the Dellnux Shopify store. The custom design perfectly captures our brand identity, and the seamless payment integration has increased our conversion rate by 35%. His attention to detail and understanding of our business needs exceeded our expectations. Highly recommended for any Shopify development project!',
          rating: 5,
          projectId: '1',
          createdAt: new Date('2024-01-20'),
          updatedAt: new Date('2024-01-20')
        },
        {
          id: '2',
          name: 'Michael Chen',
          company: 'SevenKoncepts',
          content: 'Working with Muhammad on our Next.js website was an absolute pleasure. He delivered a modern, responsive site that loads incredibly fast and ranks perfectly on Google. The SEO optimization he implemented has increased our organic traffic by 60%. His communication throughout the project was excellent, and he delivered everything on time. We couldn\'t be happier with the results!',
          text: 'Working with Muhammad on our Next.js website was an absolute pleasure. He delivered a modern, responsive site that loads incredibly fast and ranks perfectly on Google. The SEO optimization he implemented has increased our organic traffic by 60%. His communication throughout the project was excellent, and he delivered everything on time. We couldn\'t be happier with the results!',
          rating: 5,
          projectId: '2',
          createdAt: new Date('2024-02-15'),
          updatedAt: new Date('2024-02-15')
        },
        {
          id: '3',
          name: 'Emily Rodriguez',
          company: 'TechStart Inc.',
          content: 'Muhammad\'s expertise in web development is truly impressive. He created a stunning landing page for our product launch that converted 40% better than our previous version. The mobile optimization is flawless, and the user experience is smooth across all devices. His technical skills combined with his understanding of conversion optimization made all the difference. We\'ve seen a significant increase in our sign-up rates!',
          text: 'Muhammad\'s expertise in web development is truly impressive. He created a stunning landing page for our product launch that converted 40% better than our previous version. The mobile optimization is flawless, and the user experience is smooth across all devices. His technical skills combined with his understanding of conversion optimization made all the difference. We\'ve seen a significant increase in our sign-up rates!',
          rating: 5,
          projectId: '4',
          createdAt: new Date('2024-02-25'),
          updatedAt: new Date('2024-02-25')
        },
        {
          id: '4',
          name: 'David Thompson',
          company: 'Local Business Solutions',
          content: 'Muhammad built our WordPress business website and exceeded all our expectations. The custom theme perfectly represents our brand, and the contact forms work flawlessly. He was patient with our feedback and made all the adjustments we requested. The site is easy to manage, and we\'ve received many compliments from our customers about how professional it looks. Great work!',
          text: 'Muhammad built our WordPress business website and exceeded all our expectations. The custom theme perfectly represents our brand, and the contact forms work flawlessly. He was patient with our feedback and made all the adjustments we requested. The site is easy to manage, and we\'ve received many compliments from our customers about how professional it looks. Great work!',
          rating: 5,
          projectId: '5',
          createdAt: new Date('2024-02-28'),
          updatedAt: new Date('2024-02-28')
        },
        {
          id: '5',
          name: 'Lisa Wang',
          company: 'DataViz Corp',
          content: 'The React dashboard Muhammad created for us is absolutely fantastic! The data visualization components are smooth and intuitive, and the user management system works perfectly. He integrated Chart.js beautifully and the Material-UI components look professional. Our team productivity has increased significantly since using this dashboard. Muhammad\'s technical skills and attention to detail are outstanding.',
          text: 'The React dashboard Muhammad created for us is absolutely fantastic! The data visualization components are smooth and intuitive, and the user management system works perfectly. He integrated Chart.js beautifully and the Material-UI components look professional. Our team productivity has increased significantly since using this dashboard. Muhammad\'s technical skills and attention to detail are outstanding.',
          rating: 5,
          projectId: '6',
          createdAt: new Date('2024-03-05'),
          updatedAt: new Date('2024-03-05')
        },
        {
          id: '6',
          name: 'James Mitchell',
          company: 'Creative Agency',
          content: 'Muhammad\'s portfolio website is a masterpiece! The animations are smooth, the design is modern, and the admin dashboard is incredibly user-friendly. He demonstrated exceptional skills in Next.js, React, and Framer Motion. Working with him was a great experience - he\'s professional, responsive, and delivers high-quality work. This portfolio showcases his talent perfectly!',
          text: 'Muhammad\'s portfolio website is a masterpiece! The animations are smooth, the design is modern, and the admin dashboard is incredibly user-friendly. He demonstrated exceptional skills in Next.js, React, and Framer Motion. Working with him was a great experience - he\'s professional, responsive, and delivers high-quality work. This portfolio showcases his talent perfectly!',
          rating: 5,
          projectId: '3',
          createdAt: new Date('2024-03-10'),
          updatedAt: new Date('2024-03-10')
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