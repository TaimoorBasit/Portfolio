import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // First, try to find user in database
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          })

          if (user && user.passwordHash) {
            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              user.passwordHash
            )

            if (isPasswordValid) {
              return {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
              }
            }
          }

          // Fallback: Check environment variables for admin credentials
          const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com'
          const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
          
          if (credentials.email === adminEmail && credentials.password === adminPassword) {
            return {
              id: 'admin-1',
              email: adminEmail,
              name: 'Admin User',
              role: 'admin',
            }
          }

          return null
        } catch (error) {
          console.error('Auth error:', error)
          
          // Fallback: Check environment variables for admin credentials
          const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com'
          const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
          
          if (credentials.email === adminEmail && credentials.password === adminPassword) {
            return {
              id: 'admin-1',
              email: adminEmail,
              name: 'Admin User',
              role: 'admin',
            }
          }
          
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/signin',
  },
  debug: process.env.NODE_ENV === 'development',
}

