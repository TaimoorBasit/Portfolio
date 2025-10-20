# Vercel Configuration for Next.js with Prisma

## Option 1: Use Vercel's Built-in Next.js Detection (Recommended)

Remove the custom build script and let Vercel handle Next.js automatically:

1. Delete `vercel-build.sh`
2. Use the standard `vercel.json` configuration
3. Vercel will automatically detect Next.js and run the build process

## Option 2: Use Vercel Build Command

If you need custom build steps, use the `vercel-build` script in package.json:

```json
{
  "version": 2,
  "buildCommand": "npm run vercel-build",
  "env": {
    "DATABASE_URL": "",
    "NEXTAUTH_SECRET": "",
    "NEXTAUTH_URL": "",
    "ADMIN_EMAIL": "",
    "ADMIN_PASSWORD": ""
  }
}
```

## Current Configuration

The current setup uses Vercel's automatic Next.js detection, which should work properly with:

- ✅ Prisma generation in build script
- ✅ Standard Next.js build process
- ✅ Proper routes-manifest.json generation
- ✅ All Vercel optimizations

## Troubleshooting

If you still get the routes-manifest.json error:

1. Make sure you're not using a custom build command
2. Ensure Next.js is properly detected by Vercel
3. Check that the build script includes `prisma generate`

