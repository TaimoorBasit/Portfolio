import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { safeApiCall } from '@/lib/apiResponse'

export async function GET() {
  return safeApiCall(
    async () => {
      const aboutData = await prisma.aboutMe.findMany()
      return aboutData
    },
    'About API'
  )
}

export async function POST(request: NextRequest) {
  return safeApiCall(
    async () => {
      const body = await request.json()
      
      // Check if about data already exists
      const existingAbout = await prisma.aboutMe.findFirst()
      
      let aboutData
      if (existingAbout) {
        // Update existing about data
        aboutData = await prisma.aboutMe.update({
          where: { id: existingAbout.id },
          data: {
            name: body.name,
            tagline: body.tagline,
            description: body.description,
            email: body.email,
            profileImage: body.profileImage
          }
        })
      } else {
        // Create new about data
        aboutData = await prisma.aboutMe.create({
          data: {
            name: body.name,
            tagline: body.tagline,
            description: body.description,
            email: body.email,
            profileImage: body.profileImage
          }
        })
      }

      return aboutData
    },
    'About POST API'
  )
}

