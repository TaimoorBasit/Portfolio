import { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Providers } from '@/components/Providers'
import { CodingBackground } from '@/components/CodingBackground'
import { prisma } from '@/lib/prisma'
import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await prisma.websiteSettings.findFirst()
    
    return {
      title: settings?.siteName || 'Portfolio - Full Stack Developer',
      description: settings?.siteDescription || 'Professional portfolio showcasing web development projects and skills',
      icons: settings?.favicon ? {
        icon: settings.favicon,
        shortcut: settings.favicon,
        apple: settings.favicon,
      } : undefined,
    }
  } catch (error) {
    console.error('Error fetching settings for metadata:', error)
    return {
      title: 'Portfolio - Full Stack Developer',
      description: 'Professional portfolio showcasing web development projects and skills',
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <CodingBackground />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
