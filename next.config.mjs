/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    unoptimized: true
  },
  productionBrowserSourceMaps: true,
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

export default nextConfig
