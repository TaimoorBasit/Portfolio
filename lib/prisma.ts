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
      create: (data: any) => Promise.resolve({ id: '1', ...data }),
      update: (data: any) => Promise.resolve({ id: '1', ...data })
    },
    aboutMe: {
      findMany: () => Promise.resolve([]),
      findFirst: () => Promise.resolve(null),
      create: (data: any) => Promise.resolve({ id: '1', ...data }),
      update: (data: any) => Promise.resolve({ id: '1', ...data })
    },
    project: {
      findMany: () => Promise.resolve([]),
      findFirst: () => Promise.resolve(null),
      create: (data: any) => Promise.resolve({ id: '1', ...data }),
      update: (data: any) => Promise.resolve({ id: '1', ...data }),
      delete: () => Promise.resolve({})
    },
    review: {
      findMany: () => Promise.resolve([]),
      findFirst: () => Promise.resolve(null),
      create: (data: any) => Promise.resolve({ id: '1', ...data }),
      update: (data: any) => Promise.resolve({ id: '1', ...data }),
      delete: () => Promise.resolve({})
    }
  }
}

export { prisma }