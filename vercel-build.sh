#!/bin/bash

# Vercel Build Script
# This script handles Prisma generation during Vercel deployment

echo "Starting Vercel build process..."

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Build Next.js application
echo "Building Next.js application..."
npm run build

echo "Build completed successfully!"
