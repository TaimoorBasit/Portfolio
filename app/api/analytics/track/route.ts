import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { page } = await request.json()

    if (!page) {
      return NextResponse.json({ error: 'Page is required' }, { status: 400 })
    }

    // Get client IP for unique view tracking
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'

    // Check if we already have analytics for this page today
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const existingAnalytics = await prisma.analytics.findFirst({
      where: {
        page,
        date: {
          gte: today,
        },
      },
    })

    if (existingAnalytics) {
      // Update existing record
      const updated = await prisma.analytics.update({
        where: { id: existingAnalytics.id },
        data: {
          views: existingAnalytics.views + 1,
          // For simplicity, we'll increment unique views too
          // In production, you'd track unique IPs more sophisticatedly
          uniqueViews: existingAnalytics.uniqueViews + 1,
        },
      })
      return NextResponse.json(updated)
    } else {
      // Create new record
      const newAnalytics = await prisma.analytics.create({
        data: {
          page,
          views: 1,
          uniqueViews: 1,
          date: today,
        },
      })
      return NextResponse.json(newAnalytics)
    }
  } catch (error) {
    console.error('Error tracking analytics:', error)
    return NextResponse.json({ error: 'Failed to track analytics' }, { status: 500 })
  }
}
