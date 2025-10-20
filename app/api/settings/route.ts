import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const settings = await prisma.websiteSettings.findMany()
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
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

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error saving settings:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}