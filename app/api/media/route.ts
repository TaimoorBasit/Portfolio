import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const mediaFiles = await prisma.mediaFile.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(mediaFiles)
  } catch (error) {
    console.error('Error fetching media files:', error)
    return NextResponse.json({ error: 'Failed to fetch media files' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const alt = formData.get('alt') as string
    const category = formData.get('category') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // For now, we'll store file info in database and use a placeholder URL
    // In production, you'd upload to Cloudinary/S3 and get the real URL
    const fileUrl = `/uploads/${file.name}` // Placeholder URL

    const mediaFile = await prisma.mediaFile.create({
      data: {
        filename: file.name,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        url: fileUrl,
        alt: alt || file.name,
        category: category || 'general',
        uploadedBy: 'admin', // In production, get from session
      },
    })

    return NextResponse.json(mediaFile)
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
