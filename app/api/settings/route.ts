import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { safeApiCall } from '@/lib/apiResponse'

export async function GET() {
  return safeApiCall(
    async () => {
      const settings = await prisma.websiteSettings.findMany()
      return settings
    },
    'Settings API'
  )
}

export async function POST(request: NextRequest) {
  return safeApiCall(
    async () => {
      const body = await request.json()
      
      // Check if settings already exist
      const existingSettings = await prisma.websiteSettings.findFirst()
      
      let settings
      if (existingSettings) {
        // Update existing settings
        settings = await prisma.websiteSettings.update({
          where: { id: existingSettings.id },
          data: {
            siteName: body.siteName,
            siteDescription: body.siteDescription,
            siteUrl: body.siteUrl,
            logo: body.logo,
            favicon: body.favicon,
            primaryColor: body.primaryColor,
            secondaryColor: body.secondaryColor,
            socialLinks: body.socialLinks,
            seoTitle: body.seoTitle,
            seoDescription: body.seoDescription,
            seoKeywords: body.seoKeywords,
            analyticsId: body.analyticsId,
            contactEmail: body.contactEmail,
            contactPhone: body.contactPhone,
            contactAddress: body.contactAddress
          }
        })
      } else {
        // Create new settings
        settings = await prisma.websiteSettings.create({
          data: {
            siteName: body.siteName,
            siteDescription: body.siteDescription,
            siteUrl: body.siteUrl,
            logo: body.logo,
            favicon: body.favicon,
            primaryColor: body.primaryColor,
            secondaryColor: body.secondaryColor,
            socialLinks: body.socialLinks,
            seoTitle: body.seoTitle,
            seoDescription: body.seoDescription,
            seoKeywords: body.seoKeywords,
            analyticsId: body.analyticsId,
            contactEmail: body.contactEmail,
            contactPhone: body.contactPhone,
            contactAddress: body.contactAddress
          }
        })
      }

      return settings
    },
    'Settings POST API'
  )
}