'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FolderOpen, Star, MessageSquare, Users, Plus, Eye, BarChart3, Image, Settings, TrendingUp, FileText, User } from 'lucide-react'
import { AdminAuthWrapper } from '@/components/AdminAuthWrapper'

interface DashboardStats {
  projects: number
  reviews: number
  messages: number
  unreadMessages: number
  totalViews: number
  uniqueViews: number
  mediaFiles: number
}

function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    reviews: 0,
    messages: 0,
    unreadMessages: 0,
    totalViews: 0,
    uniqueViews: 0,
    mediaFiles: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      console.log('Fetching admin dashboard stats...')
      const [projectsRes, reviewsRes, messagesRes, analyticsRes, mediaRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/reviews'),
        fetch('/api/contact'),
        fetch('/api/analytics'),
        fetch('/api/media'),
      ])

      const projects = await projectsRes.json()
      const reviews = await reviewsRes.json()
      const messages = await messagesRes.json()
      const analytics = await analyticsRes.json()
      const mediaFiles = await mediaRes.json()

      console.log('Dashboard data:', {
        projects: projects.length,
        reviews: reviews.length,
        messages: messages.length,
        analytics,
        mediaFiles: mediaFiles.length
      })

      setStats({
        projects: projects.length,
        reviews: reviews.length,
        messages: messages.length,
        unreadMessages: messages.filter((m: any) => !m.read).length,
        totalViews: analytics.totalViews || 0,
        uniqueViews: analytics.uniqueViews || 0,
        mediaFiles: mediaFiles.length,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: FolderOpen,
      color: 'bg-gradient-to-br from-electric-teal to-cyan-glow',
      href: '/admin/projects',
    },
    {
      title: 'Total Reviews',
      value: stats.reviews,
      icon: Star,
      color: 'bg-gradient-to-br from-violet-glow to-purple-aura',
      href: '/admin/reviews',
    },
    {
      title: 'Unread Messages',
      value: stats.unreadMessages,
      icon: MessageSquare,
      color: 'bg-gradient-to-br from-magenta-neon to-pink-500',
      href: '/admin/messages',
    },
    {
      title: 'Total Views',
      value: stats.totalViews,
      icon: BarChart3,
      color: 'bg-gradient-to-br from-electric-teal to-cyan-glow',
      href: '/admin/analytics',
    },
    {
      title: 'Unique Views',
      value: stats.uniqueViews,
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-violet-glow to-purple-aura',
      href: '/admin/analytics',
    },
    {
      title: 'Media Files',
      value: stats.mediaFiles,
      icon: Image,
      color: 'bg-gradient-to-br from-magenta-neon to-pink-500',
      href: '/admin/media',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-electric-teal border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-cinematic">Admin Dashboard</h1>
          <Link href="/" target="_blank">
            <Button variant="outline" className="border-electric-teal text-electric-teal hover:bg-electric-teal hover:text-obsidian w-full sm:w-auto">
              <Eye className="h-4 w-4 mr-2" />
              View Website
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6 mb-8">
          {statCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card rounded-2xl p-4 lg:p-6 hover-glow cursor-pointer"
              onClick={() => window.location.href = card.href}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-2 font-body">
                    {card.title}
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-cinematic">
                    {card.value}
                  </p>
                </div>
                <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${card.color} rounded-xl flex items-center justify-center neon-glow-teal`}>
                  <card.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-card rounded-2xl p-4 lg:p-8"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 font-cinematic">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    <Link href="/admin/projects">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 lg:gap-4 p-4 lg:p-6 border border-electric-teal/30 rounded-xl hover:bg-electric-teal/10 transition-all duration-300 neon-glow-teal"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-electric-teal to-cyan-glow rounded-lg flex items-center justify-center">
                          <FolderOpen className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <span className="font-semibold text-white font-cinematic">Manage Projects</span>
                          <p className="text-sm text-gray-400 font-body">Add, edit, or delete projects</p>
                        </div>
                      </motion.div>
                    </Link>
                    <Link href="/admin/about">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 lg:gap-4 p-4 lg:p-6 border border-electric-purple/30 rounded-xl hover:bg-electric-purple/10 transition-all duration-300 neon-glow-purple"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-electric-purple to-vivid-violet rounded-lg flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <span className="font-semibold text-white font-cinematic">About Me</span>
                          <p className="text-sm text-gray-400 font-body">Edit profile information and image</p>
                        </div>
                      </motion.div>
                    </Link>
                    <Link href="/admin/reviews">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 lg:gap-4 p-4 lg:p-6 border border-violet-glow/30 rounded-xl hover:bg-violet-glow/10 transition-all duration-300 neon-glow-violet"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-violet-glow to-purple-aura rounded-lg flex items-center justify-center">
                          <Star className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <span className="font-semibold text-white font-cinematic">Manage Reviews</span>
                          <p className="text-sm text-gray-400 font-body">Add, edit, or delete reviews</p>
                        </div>
                      </motion.div>
                    </Link>
                    <Link href="/admin/messages">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 lg:gap-4 p-4 lg:p-6 border border-magenta-neon/30 rounded-xl hover:bg-magenta-neon/10 transition-all duration-300 neon-glow-magenta"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-magenta-neon to-pink-500 rounded-lg flex items-center justify-center">
                          <MessageSquare className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <span className="font-semibold text-white font-cinematic">View Messages</span>
                          <p className="text-sm text-gray-400 font-body">Read and manage contact messages</p>
                        </div>
                      </motion.div>
                    </Link>
                    <Link href="/admin/analytics">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 lg:gap-4 p-4 lg:p-6 border border-electric-teal/30 rounded-xl hover:bg-electric-teal/10 transition-all duration-300 neon-glow-teal"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-electric-teal to-cyan-glow rounded-lg flex items-center justify-center">
                          <BarChart3 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <span className="font-semibold text-white font-cinematic">View Analytics</span>
                          <p className="text-sm text-gray-400 font-body">Track website performance</p>
                        </div>
                      </motion.div>
                    </Link>
                    <Link href="/admin/media">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 lg:gap-4 p-4 lg:p-6 border border-violet-glow/30 rounded-xl hover:bg-violet-glow/10 transition-all duration-300 neon-glow-violet"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-violet-glow to-purple-aura rounded-lg flex items-center justify-center">
                          <Image className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <span className="font-semibold text-white font-cinematic">Media Library</span>
                          <p className="text-sm text-gray-400 font-body">Manage images and files</p>
                        </div>
                      </motion.div>
                    </Link>
                    <Link href="/admin/content">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 lg:gap-4 p-4 lg:p-6 border border-electric-teal/30 rounded-xl hover:bg-electric-teal/10 transition-all duration-300 neon-glow-teal"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-electric-teal to-cyan-glow rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <span className="font-semibold text-white font-cinematic">Content Editor</span>
                          <p className="text-sm text-gray-400 font-body">Edit website text and sections</p>
                        </div>
                      </motion.div>
                    </Link>
                    <Link href="/admin/change-password">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 lg:gap-4 p-4 lg:p-6 border border-magenta-neon/30 rounded-xl hover:bg-magenta-neon/10 transition-all duration-300 neon-glow-magenta"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-magenta-neon to-pink-500 rounded-lg flex items-center justify-center">
                          <Settings className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <span className="font-semibold text-white font-cinematic">Change Password</span>
                          <p className="text-sm text-gray-400 font-body">Update admin password</p>
                        </div>
                      </motion.div>
                    </Link>
                  </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function AdminDashboardPage() {
  return (
    <AdminAuthWrapper>
      <AdminDashboard />
    </AdminAuthWrapper>
  )
}

