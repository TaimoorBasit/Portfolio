'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Eye, Users, TrendingUp, Calendar, Globe } from 'lucide-react'
import { AdminAuthWrapper } from '@/components/AdminAuthWrapper'

interface AnalyticsData {
  totalViews: number
  uniqueViews: number
  topPages: Array<{
    page: string
    views: number
    uniqueViews: number
  }>
  dailyStats: Array<{
    date: string
    views: number
    uniqueViews: number
  }>
}

function AdminAnalyticsContent() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    uniqueViews: 0,
    topPages: [],
    dailyStats: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics')
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const trackPageView = async (page: string) => {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page }),
      })
    } catch (error) {
      console.error('Error tracking page view:', error)
    }
  }

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
    <div className="p-8 bg-obsidian text-white min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white font-cinematic">Analytics Dashboard</h1>
          <button
            onClick={() => trackPageView('/admin/analytics')}
            className="px-4 py-2 bg-electric-teal hover:bg-electric-teal/80 text-obsidian rounded-lg transition-colors"
          >
            Track This Page
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-2 font-body">Total Views</p>
                <p className="text-3xl font-bold text-white font-cinematic">{analytics.totalViews}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-electric-teal to-cyan-glow rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-2 font-body">Unique Views</p>
                <p className="text-3xl font-bold text-white font-cinematic">{analytics.uniqueViews}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-violet-glow to-purple-aura rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-2 font-body">Top Page</p>
                <p className="text-lg font-bold text-white font-cinematic truncate">
                  {analytics.topPages[0]?.page || 'N/A'}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-magenta-neon to-pink-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-2 font-body">Pages Tracked</p>
                <p className="text-3xl font-bold text-white font-cinematic">{analytics.topPages.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-electric-teal to-cyan-glow rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-electric-teal to-cyan-glow rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white font-cinematic">Top Pages</h2>
            </div>

            {analytics.topPages.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No page views tracked yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {analytics.topPages.map((page, index) => (
                  <div key={page.page} className="flex items-center justify-between p-3 bg-charcoal rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-400">#{index + 1}</span>
                      <span className="text-white font-body">{page.page}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">{page.views} views</p>
                      <p className="text-xs text-gray-400">{page.uniqueViews} unique</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Daily Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-glow to-purple-aura rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white font-cinematic">Recent Activity</h2>
            </div>

            {analytics.dailyStats.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No recent activity</p>
              </div>
            ) : (
              <div className="space-y-3">
                {analytics.dailyStats.slice(0, 7).map((stat, index) => (
                  <div key={stat.date} className="flex items-center justify-between p-3 bg-charcoal rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-400">{stat.date}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">{stat.views} views</p>
                      <p className="text-xs text-gray-400">{stat.uniqueViews} unique</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Analytics Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="glass-card rounded-2xl p-6 mt-8"
        >
          <h2 className="text-xl font-semibold text-white mb-4 font-cinematic">Analytics Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300 font-body">
            <div>
              <h3 className="font-semibold text-white mb-2">How it works:</h3>
              <ul className="space-y-1 text-sm">
                <li>• Page views are tracked automatically</li>
                <li>• Unique views are based on IP addresses</li>
                <li>• Data is stored locally in your database</li>
                <li>• Analytics update in real-time</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Integration:</h3>
              <ul className="space-y-1 text-sm">
                <li>• Add Google Analytics ID in Settings</li>
                <li>• Track custom events with API</li>
                <li>• Export data for external analysis</li>
                <li>• Privacy-focused local tracking</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function AdminAnalyticsPage() {
  return (
    <AdminAuthWrapper>
      <AdminAnalyticsContent />
    </AdminAuthWrapper>
  )
}
