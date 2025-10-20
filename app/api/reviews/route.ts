import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { safeApiCall } from '@/lib/apiResponse'

export async function GET() {
  return safeApiCall(
    async () => {
      const reviews = await prisma.review.findMany({
        include: {
          project: {
            select: {
              title: true,
              slug: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
      return reviews
    },
    'Reviews API'
  )
}

export async function POST(request: NextRequest) {
  return safeApiCall(
    async () => {
      const body = await request.json()
      
      const review = await prisma.review.create({
        data: {
          name: body.name,
          company: body.company,
          content: body.content || body.text,
          text: body.text || body.content,
          rating: body.rating,
          projectId: body.projectId || null
        }
      })

      return review
    },
    'Reviews POST API'
  )
}