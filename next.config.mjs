/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    unoptimized: true
  }
}

export default nextConfig
