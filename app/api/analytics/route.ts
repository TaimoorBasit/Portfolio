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
          topPages: JSON.parse(analyticsData.topPages || '[]'),
          referrers: JSON.parse(analyticsData.referrers || '[]')
        }
      }
      
      // Fallback data if no analytics found
      return {
        totalViews: 1250,
        uniqueViews: 890,
        pageViews: 2100,
        bounceRate: 0.35,
        avgSessionDuration: 180,
        topPages: ['/', '/projects', '/about', '/contact'],
        referrers: ['google.com', 'linkedin.com', 'github.com']
      }
    },
    'Analytics API'
  )
}
