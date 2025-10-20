import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { safeApiCall } from '@/lib/apiResponse'

export async function GET() {
  return safeApiCall(
    async () => {
      const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
      })
      return projects
    },
    'Projects API'
  )
}

export async function POST(request: NextRequest) {
  return safeApiCall(
    async () => {
      const body = await request.json()
      
      const project = await prisma.project.create({
        data: {
          title: body.title,
          slug: body.slug,
          description: body.description,
          images: JSON.stringify(body.images || ['/placeholder-project.jpg']),
          technologies: body.technologies ? JSON.stringify(body.technologies) : null,
          demoUrl: body.demoUrl,
          githubUrl: body.githubUrl,
          featured: body.featured || false,
          tags: JSON.stringify(body.tags || []),
          techStack: JSON.stringify(body.techStack || [])
        }
      })

      return project
    },
    'Projects POST API'
  )
}