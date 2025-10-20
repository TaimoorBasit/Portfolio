'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  ArrowLeft,
  Save,
  Settings,
  Globe,
  Palette,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import { AdminAuthWrapper } from '@/components/AdminAuthWrapper'
import { FileUpload } from '@/components/FileUpload'

interface WebsiteSettings {
  id: string
  siteName: string
  siteDescription: string
  siteUrl: string
  logo: string
  favicon: string
  primaryColor: string
  secondaryColor: string
  socialLinks: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  analyticsId: string
  contactEmail: string
  contactPhone: string
  contactAddress: string
}

interface UploadedFile {
  url: string
  filename: string
  originalName: string
  size: number
  type: string
  uploadedAt: string
}

function WebsiteSettings() {
  const [settings, setSettings] = useState<WebsiteSettings>({
    id: '',
    siteName: 'Muhammad Taimoor',
    siteDescription: 'Full-Stack Developer specializing in Shopify, WordPress, and Next.js e-commerce solutions',
    siteUrl: '',
    logo: '',
    favicon: '',
    primaryColor: '#8b5cf6',
    secondaryColor: '#a855f7',
    socialLinks: '{}',
    seoTitle: 'Muhammad Taimoor - Full-Stack Developer',
    seoDescription: 'Professional web development services specializing in Shopify, WordPress, and Next.js',
    seoKeywords: 'web development, shopify, wordpress, nextjs, e-commerce',
    analyticsId: '',
    contactEmail: 'taimoor@gmail.com',
    contactPhone: '',
    contactAddress: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [logoFiles, setLogoFiles] = useState<UploadedFile[]>([])
  const [faviconFiles, setFaviconFiles] = useState<UploadedFile[]>([])

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      const data = await response.json()
      if (data.length > 0) {
        setSettings(data[0])
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        alert('Settings saved successfully!')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Error saving settings')
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: keyof WebsiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleLogoUpload = async (files: UploadedFile[]) => {
    setLogoFiles(files)
    if (files.length > 0) {
      const logoUrl = files[0].url
      
      // Update settings state
      setSettings(prev => ({ ...prev, logo: logoUrl }))
      
      // Auto-save after upload
      try {
        const response = await fetch('/api/settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...settings,
            logo: logoUrl,
            socialLinks: settings.socialLinks || '{}'
          }),
        })
        if (response.ok) {
          console.log('Logo uploaded and saved successfully')
        } else {
          const errorData = await response.json()
          console.error('Error saving logo:', errorData)
        }
      } catch (error) {
        console.error('Error saving logo:', error)
      }
    }
  }

  const handleFaviconUpload = async (files: UploadedFile[]) => {
    setFaviconFiles(files)
    if (files.length > 0) {
      const faviconUrl = files[0].url
      
      // Update settings state
      setSettings(prev => ({ ...prev, favicon: faviconUrl }))
      
      // Auto-save after upload
      try {
        const response = await fetch('/api/settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...settings,
            favicon: faviconUrl,
            socialLinks: settings.socialLinks || '{}'
          }),
        })
        if (response.ok) {
          console.log('Favicon uploaded and saved successfully')
        } else {
          const errorData = await response.json()
          console.error('Error saving favicon:', errorData)
        }
      } catch (error) {
        console.error('Error saving favicon:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-electric-purple border-t-transparent rounded-full"
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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="border-electric-purple text-electric-purple hover:bg-electric-purple hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-white font-cinematic">Website Settings</h1>
          </div>
          <Button 
            onClick={handleSave}
            disabled={saving}
            className="bg-button-gradient text-white border-0 hover:shadow-luxury-purple"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-electric-purple to-violet-glow rounded-lg flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white font-cinematic">Basic Settings</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">Site Name</label>
                <Input
                  value={settings.siteName}
                  onChange={(e) => handleInputChange('siteName', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Site Description</label>
                <Textarea
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Site URL</label>
                <Input
                  value={settings.siteUrl}
                  onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                />
              </div>
            </div>
          </motion.div>

          {/* Design Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-electric-purple to-violet-glow rounded-lg flex items-center justify-center">
                <Palette className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white font-cinematic">Design Settings</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Primary Color</label>
                  <Input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white focus:border-electric-purple h-12"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Secondary Color</label>
                  <Input
                    type="color"
                    value={settings.secondaryColor}
                    onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white focus:border-electric-purple h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-white font-semibold mb-1">Logo</label>
                <FileUpload
                  onUpload={handleLogoUpload}
                  multiple={false}
                  accept="image/*"
                  maxFiles={1}
                  maxSize={5}
                  uploadType="settings"
                  className=""
                />
                {settings.logo && (
                  <div className="mt-2 p-2 bg-gray-800 rounded border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-gray-400">Current Logo:</p>
                      <button
                        onClick={() => {
                          setSettings(prev => ({ ...prev, logo: '' }))
                          setLogoFiles([])
                        }}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                    <img 
                      src={settings.logo} 
                      alt="Logo preview" 
                      className="max-h-16 max-w-32 object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-white font-semibold mb-1">Favicon</label>
                <FileUpload
                  onUpload={handleFaviconUpload}
                  multiple={false}
                  accept="image/*"
                  maxFiles={1}
                  maxSize={1}
                  uploadType="settings"
                  className=""
                />
                {settings.favicon && (
                  <div className="mt-2 p-2 bg-gray-800 rounded border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-gray-400">Current Favicon:</p>
                      <button
                        onClick={() => {
                          setSettings(prev => ({ ...prev, favicon: '' }))
                          setFaviconFiles([])
                        }}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                    <img 
                      src={settings.favicon} 
                      alt="Favicon preview" 
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-electric-purple to-violet-glow rounded-lg flex items-center justify-center">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white font-cinematic">Contact Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">Email Address</label>
                <Input
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder="your@email.com"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Phone Number</label>
                <Input
                  value={settings.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Address</label>
                <Textarea
                  value={settings.contactAddress}
                  onChange={(e) => handleInputChange('contactAddress', e.target.value)}
                  placeholder="Your business address"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                  rows={3}
                />
              </div>
            </div>
          </motion.div>

          {/* SEO Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-electric-purple to-violet-glow rounded-lg flex items-center justify-center">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white font-cinematic">SEO Settings</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">SEO Title</label>
                <Input
                  value={settings.seoTitle}
                  onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">SEO Description</label>
                <Textarea
                  value={settings.seoDescription}
                  onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">SEO Keywords</label>
                <Input
                  value={settings.seoKeywords}
                  onChange={(e) => handleInputChange('seoKeywords', e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Analytics ID</label>
                <Input
                  value={settings.analyticsId}
                  onChange={(e) => handleInputChange('analyticsId', e.target.value)}
                  placeholder="GA-XXXXXXXXX-X"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default function WebsiteSettingsPage() {
  return (
    <AdminAuthWrapper>
      <WebsiteSettings />
    </AdminAuthWrapper>
  )
}