import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const aboutData = await prisma.aboutMe.findMany()
    return NextResponse.json(aboutData)
  } catch (error) {
    console.error('Error fetching about data:', error)
    return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
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

    return NextResponse.json(aboutData)
  } catch (error) {
    console.error('Error saving about data:', error)
    return NextResponse.json({ error: 'Failed to save about data' }, { status: 500 })
  }
}

