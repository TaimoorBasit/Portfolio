'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-electric-teal border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!session || session.user.role !== 'ADMIN') {
    router.push('/admin/signin')
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 rounded-2xl text-center"
        >
          <h2 className="text-xl font-semibold text-white mb-4 font-cinematic">
            Access Denied
          </h2>
          <p className="text-gray-400 font-body">
            Redirecting to sign in...
          </p>
        </motion.div>
      </div>
    )
  }

  return <>{children}</>
}
