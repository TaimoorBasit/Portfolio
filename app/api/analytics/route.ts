import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { safeApiCall } from '@/lib/apiResponse'

export async function GET() {
  return safeApiCall(
    async () => {
      // Get analytics data from the mock client
      const analyticsData = await prisma.analytics.findFirst()
      
      if (analyticsData) {
        return {
          totalViews: analyticsData.totalViews || 0,
          uniqueViews: analyticsData.uniqueViews || 0,
          pageViews: analyticsData.pageViews || 0,
          bounceRate: analyticsData.bounceRate || 0,
          avgSessionDuration: analyticsData.avgSessionDuration || 0,
          topPages: JSON.parse(analyticsData.topPages || '[]').map((page: string, index: number) => ({
            page: page,
            views: Math.floor((analyticsData.pageViews || 0) / JSON.parse(analyticsData.topPages || '[]').length),
            uniqueViews: Math.floor((analyticsData.uniqueViews || 0) / JSON.parse(analyticsData.topPages || '[]').length)
          })),
          referrers: JSON.parse(analyticsData.referrers || '[]'),
          dailyStats: [
            { date: '2024-03-01', views: 180, uniqueViews: 120 },
            { date: '2024-02-28', views: 165, uniqueViews: 110 },
            { date: '2024-02-27', views: 200, uniqueViews: 140 },
            { date: '2024-02-26', views: 175, uniqueViews: 125 },
            { date: '2024-02-25', views: 190, uniqueViews: 135 },
            { date: '2024-02-24', views: 160, uniqueViews: 115 },
            { date: '2024-02-23', views: 185, uniqueViews: 130 }
          ]
        }
      }
      
      // Fallback data if no analytics found
      const fallbackPages = ['/', '/projects', '/about', '/contact']
      return {
        totalViews: 1250,
        uniqueViews: 890,
        pageViews: 2100,
        bounceRate: 0.35,
        avgSessionDuration: 180,
        topPages: fallbackPages.map((page, index) => ({
          page: page,
          views: Math.floor(2100 / fallbackPages.length),
          uniqueViews: Math.floor(890 / fallbackPages.length)
        })),
        referrers: ['google.com', 'linkedin.com', 'github.com'],
        dailyStats: [
          { date: '2024-03-01', views: 180, uniqueViews: 120 },
          { date: '2024-02-28', views: 165, uniqueViews: 110 },
          { date: '2024-02-27', views: 200, uniqueViews: 140 },
          { date: '2024-02-26', views: 175, uniqueViews: 125 },
          { date: '2024-02-25', views: 190, uniqueViews: 135 },
          { date: '2024-02-24', views: 160, uniqueViews: 115 },
          { date: '2024-02-23', views: 185, uniqueViews: 130 }
        ]
      }
    },
    'Analytics API'
  )
}
