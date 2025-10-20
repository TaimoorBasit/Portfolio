import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get total views and unique views
    const totalViews = await prisma.analytics.aggregate({
      _sum: { views: true },
    })

    const uniqueViews = await prisma.analytics.aggregate({
      _sum: { uniqueViews: true },
    })

    // Get top pages
    const topPages = await prisma.analytics.groupBy({
      by: ['page'],
      _sum: {
        views: true,
        uniqueViews: true,
      },
      orderBy: {
        _sum: {
          views: 'desc',
        },
      },
      take: 10,
    })

    // Get daily stats for the last 7 days
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const dailyStats = await prisma.analytics.groupBy({
      by: ['date'],
      where: {
        date: {
          gte: sevenDaysAgo,
        },
      },
      _sum: {
        views: true,
        uniqueViews: true,
      },
      orderBy: {
        date: 'desc',
      },
    })

    return NextResponse.json({
      totalViews: totalViews._sum.views || 0,
      uniqueViews: uniqueViews._sum.uniqueViews || 0,
      topPages: topPages.map((page: any) => ({
        page: page.page,
        views: page._sum.views || 0,
        uniqueViews: page._sum.uniqueViews || 0,
      })),
      dailyStats: dailyStats.map((stat: any) => ({
        date: stat.date.toISOString().split('T')[0],
        views: stat._sum.views || 0,
        uniqueViews: stat._sum.uniqueViews || 0,
      })),
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
