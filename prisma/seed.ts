import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'muhammad.taimoor@example.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  
  const hashedPassword = await bcrypt.hash(adminPassword, 12)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Muhammad Taimoor',
      passwordHash: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('Admin user created:', admin)

  // Create actual client projects
  const projects = await Promise.all([
    prisma.project.upsert({
      where: { slug: 'dellnux-ecommerce' },
      update: {},
      create: {
        title: 'Dellnux E-commerce Store',
        slug: 'dellnux-ecommerce',
        description: 'Complete Shopify e-commerce store for Dellnux with custom theme, payment integration, and inventory management.',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
          'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800'
        ]),
        tags: JSON.stringify(['E-commerce', 'Shopify', 'Custom Theme']),
        techStack: JSON.stringify(['Shopify', 'Liquid', 'JavaScript', 'CSS', 'Payment Gateway']),
        demoUrl: 'https://www.dellnux.com',
        featured: true,
      },
    }),
    prisma.project.upsert({
      where: { slug: 'eternalaspirants-landing' },
      update: {},
      create: {
        title: 'ETERNALASPIRANTS Landing Page',
        slug: 'eternalaspirants-landing',
        description: 'Professional WordPress landing page for ETERNALASPIRANTS with custom design and responsive layout.',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
        ]),
        tags: JSON.stringify(['WordPress', 'Landing Page', 'Custom Design']),
        techStack: JSON.stringify(['WordPress', 'PHP', 'CSS', 'JavaScript', 'Custom Theme']),
        demoUrl: 'https://www.eternalaspirants.com',
        featured: true,
      },
    }),
    prisma.project.upsert({
      where: { slug: 'elysiadistribution-website' },
      update: {},
      create: {
        title: 'ElysiaDistribution Website',
        slug: 'elysiadistribution-website',
        description: 'WordPress business website for ElysiaDistribution with custom functionality and modern design.',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800'
        ]),
        tags: JSON.stringify(['WordPress', 'Business Website', 'Custom Features']),
        techStack: JSON.stringify(['WordPress', 'PHP', 'CSS', 'JavaScript', 'Custom Plugins']),
        demoUrl: 'https://elysiadistribution.com',
        featured: true,
      },
    }),
    prisma.project.upsert({
      where: { slug: 'sevenkoncepts-nextjs' },
      update: {},
      create: {
        title: 'SevenKoncepts Next.js Website',
        slug: 'sevenkoncepts-nextjs',
        description: 'Modern Next.js application for SevenKoncepts with server-side rendering and dynamic content.',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
        ]),
        tags: JSON.stringify(['Next.js', 'React', 'SSR', 'Modern Web App']),
        techStack: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'API Integration']),
        demoUrl: 'https://www.sevenkoncepts.com',
        featured: true,
      },
    }),
    prisma.project.upsert({
      where: { slug: 'fastfoodexpress-app' },
      update: {},
      create: {
        title: 'FastFoodExpress App',
        slug: 'fastfoodexpress-app',
        description: 'Next.js fast food ordering application with real-time features and payment integration.',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800'
        ]),
        tags: JSON.stringify(['Next.js', 'Food App', 'Real-time', 'Payment']),
        techStack: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Payment API']),
        demoUrl: 'https://fastfoodexpress.vercel.app',
        featured: false,
      },
    }),
  ])

  console.log('Projects created:', projects.length)

  // Create actual client reviews
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        name: 'Bilal Khan',
        company: 'Dellnux',
        rating: 5,
        text: 'Muhammad delivered an exceptional Shopify store for Dellnux. The custom theme and payment integration work perfectly. Highly professional and responsive developer.',
        projectId: projects[0].id,
      },
    }),
    prisma.review.create({
      data: {
        name: 'Syed Qamar',
        company: 'ETERNALASPIRANTS',
        rating: 5,
        text: 'Outstanding WordPress landing page design. Muhammad understood our vision perfectly and delivered beyond expectations. Great communication throughout the project.',
        projectId: projects[1].id,
      },
    }),
    prisma.review.create({
      data: {
        name: 'Syed Qamar',
        company: 'ElysiaDistribution',
        rating: 5,
        text: 'Professional WordPress website with custom functionality. Muhammad\'s attention to detail and technical expertise made our business website stand out.',
        projectId: projects[2].id,
      },
    }),
    prisma.review.create({
      data: {
        name: 'Mir Shehryar Khan',
        company: 'SevenKoncepts',
        rating: 5,
        text: 'Excellent Next.js application development. The modern design and server-side rendering features work flawlessly. Muhammad is a skilled developer.',
        projectId: projects[3].id,
      },
    }),
    prisma.review.create({
      data: {
        name: 'Client Review',
        company: 'FastFoodExpress',
        rating: 4,
        text: 'Great Next.js food ordering app with real-time features. The payment integration and user experience are top-notch. Recommended for web development projects.',
        projectId: projects[4].id,
      },
    }),
  ])

  console.log('Reviews created:', reviews.length)

  // Create sample contact messages
  const messages = await Promise.all([
    prisma.contactMessage.create({
      data: {
        name: 'John Smith',
        email: 'john@example.com',
        message: 'Hi, I\'m interested in hiring you for a React project. Could we schedule a call to discuss the details?',
        read: false,
      },
    }),
    prisma.contactMessage.create({
      data: {
        name: 'Lisa Brown',
        email: 'lisa@company.com',
        message: 'Your portfolio looks amazing! We have a full-stack project that might be a good fit. Let me know if you\'re available.',
        read: true,
      },
    }),
  ])

  console.log('Contact messages created:', messages.length)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
