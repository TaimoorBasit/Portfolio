import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { safeApiCall } from '@/lib/apiResponse'

export async function GET() {
  return safeApiCall(
    async () => {
      const mediaFiles = await prisma.mediaFile.findMany({
        orderBy: { createdAt: 'desc' }
      })
      return mediaFiles
    },
    'Media Files API'
  )
}

export async function POST(request: NextRequest) {
  return safeApiCall(
    async () => {
      const body = await request.json()

      const mediaFile = await prisma.mediaFile.create({
        data: {
          filename: body.filename,
          originalName: body.originalName,
          mimeType: body.mimeType,
          size: body.size,
          url: body.url
        }
      })

      return mediaFile
    },
    'Media Files POST API'
  )
}