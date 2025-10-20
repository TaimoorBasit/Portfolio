import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/neon-db'
import { safeApiCall } from '@/lib/apiResponse'

export async function GET() {
  return safeApiCall(
    async () => {
      const projects = await db.getProjects()
      return projects
    },
    'Projects API'
  )
}

export async function POST(request: NextRequest) {
  return safeApiCall(
    async () => {
      const body = await request.json()

      const project = await db.createProject({
        title: body.title,
        slug: body.slug,
        description: body.description,
        images: body.images || ['/placeholder-project.jpg'],
        technologies: body.technologies || [],
        demoUrl: body.demoUrl,
        githubUrl: body.githubUrl,
        featured: body.featured || false,
        tags: body.tags || [],
        techStack: body.techStack || []
      })

      return project
    },
    'Projects POST API'
  )
}