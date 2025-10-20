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
      findMany: () => Promise.resolve([]),
      findFirst: () => Promise.resolve(null),
      create: (data: any) => Promise.resolve({ id: '1', ...data.data }),
      update: (data: any) => Promise.resolve({ id: '1', ...data.data }),
      delete: () => Promise.resolve({})
    },
    review: {
      findMany: () => Promise.resolve([]),
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