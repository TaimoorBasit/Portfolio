import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { safeApiCall } from '@/lib/apiResponse'

export async function GET() {
  return safeApiCall(
    async () => {
      const messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' }
      })
      return messages
    },
    'Contact Messages API'
  )
}

export async function POST(request: NextRequest) {
  return safeApiCall(
    async () => {
      const body = await request.json()

      const message = await prisma.contactMessage.create({
        data: {
          name: body.name,
          email: body.email,
          subject: body.subject,
          message: body.message,
          read: body.read || false
        }
      })

      return message
    },
    'Contact Messages POST API'
  )
}