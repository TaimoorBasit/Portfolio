import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/neon-db'
import { safeApiCall } from '@/lib/apiResponse'

export async function GET() {
  return safeApiCall(
    async () => {
      const aboutData = await db.getAboutMe()
      return [aboutData] // Return as array to match expected format
    },
    'About API'
  )
}

export async function POST(request: NextRequest) {
  return safeApiCall(
    async () => {
      const body = await request.json()

      const aboutData = await db.updateAboutMe({
        name: body.name,
        tagline: body.tagline,
        description: body.description,
        email: body.email,
        profileImage: body.profileImage
      })

      return aboutData
    },
    'About POST API'
  )
}

