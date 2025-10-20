import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/neon'
import { safeApiCall } from '@/lib/apiResponse'

export async function GET() {
  return safeApiCall(
    async () => {
      const reviews = await db.getReviews()
      return reviews
    },
    'Reviews API'
  )
}

export async function POST(request: NextRequest) {
  return safeApiCall(
    async () => {
      const body = await request.json()

      const review = await db.createReview({
        name: body.name,
        company: body.company,
        content: body.content || body.text,
        text: body.text || body.content,
        rating: body.rating,
        projectId: body.projectId || null
      })

      return review
    },
    'Reviews POST API'
  )
}