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
  User,
  Mail,
  Upload
} from 'lucide-react'
import { AdminAuthWrapper } from '@/components/AdminAuthWrapper'
import { FileUpload } from '@/components/FileUpload'

interface AboutMeData {
  id: string
  name: string
  tagline: string
  description: string
  email: string
  profileImage: string
}

interface UploadedFile {
  url: string
  filename: string
  originalName: string
  size: number
  type: string
  uploadedAt: string
}

function AboutMeManagement() {
  const [aboutData, setAboutData] = useState<AboutMeData>({
    id: '',
    name: 'Muhammad Taimoor',
    tagline: 'Your Vision, Digital Reality.',
    description: 'I specialize in Shopify e-commerce stores, WordPress landing pages, and Next.js applications. From Dellnux\'s complete Shopify store to SevenKoncepts\' Next.js website, I deliver results. When you hire me, you work directly with me. No project managers, no hand-offs. Just a direct line to your successful online presence.',
    email: 'taimoor@gmail.com',
    profileImage: ''
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profileFiles, setProfileFiles] = useState<UploadedFile[]>([])

  useEffect(() => {
    fetchAboutData()
  }, [])

  const fetchAboutData = async () => {
    try {
      console.log('Fetching about data...')
      const response = await fetch('/api/about')
      const data = await response.json()
      console.log('Fetched about data:', data)
      if (data.length > 0) {
        setAboutData(data[0])
        console.log('Set about data:', data[0])
        if (data[0].profileImage) {
          setProfileFiles([{
            url: data[0].profileImage,
            filename: data[0].profileImage.split('/').pop() || '',
            originalName: data[0].profileImage.split('/').pop() || '',
            size: 0,
            type: 'image/*',
            uploadedAt: new Date().toISOString()
          }])
        }
      }
    } catch (error) {
      console.error('Error fetching about data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      console.log('Saving about data:', aboutData)
      const response = await fetch('/api/about', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aboutData),
      })

      console.log('Response status:', response.status)
      if (response.ok) {
        const result = await response.json()
        console.log('Save successful:', result)
        alert('About Me data saved successfully!')
      } else {
        const errorData = await response.json()
        console.error('Save failed:', errorData)
        alert('Error saving about data: ' + (errorData.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error saving about data:', error)
      alert('Error saving about data: ' + error)
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: keyof AboutMeData, value: string) => {
    setAboutData(prev => ({ ...prev, [field]: value }))
  }

  const handleProfileImageUpload = async (files: UploadedFile[]) => {
    console.log('Profile image upload called with files:', files)
    setProfileFiles(files)
    if (files.length > 0) {
      const imageUrl = files[0].url
      console.log('Profile image URL:', imageUrl)
      
      // Update about data state
      setAboutData(prev => {
        console.log('Updating about data with profile image:', imageUrl)
        return { ...prev, profileImage: imageUrl }
      })
      
      // Auto-save after upload
      try {
        const updatedData = { ...aboutData, profileImage: imageUrl }
        console.log('Sending profile image data to API:', updatedData)
        const response = await fetch('/api/about', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        })
        console.log('Profile image API response status:', response.status)
        if (response.ok) {
          const result = await response.json()
          console.log('Profile image uploaded and saved successfully:', result)
        } else {
          const errorData = await response.json()
          console.error('Error saving profile image:', errorData)
        }
      } catch (error) {
        console.error('Error saving profile image:', error)
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
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between sticky top-0 bg-obsidian/90 backdrop-blur-md z-10 py-4 border-b border-gray-700"
      >
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white font-cinematic">About Me Management</h1>
            <p className="text-gray-400 font-body">Edit your profile information and image</p>
          </div>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-button-gradient hover:shadow-luxury-purple text-white"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </motion.div>

      {/* Profile Image Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-electric-purple to-vivid-violet rounded-lg flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white font-cinematic">Profile Image</h2>
            <p className="text-gray-400 font-body">Upload your profile picture</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-white font-semibold mb-1">Profile Image</label>
            <FileUpload
              onUpload={handleProfileImageUpload}
              multiple={false}
              accept="image/*"
              maxFiles={1}
              maxSize={5}
              uploadType="about"
              className=""
            />
            {aboutData.profileImage && (
              <div className="mt-2 p-2 bg-gray-800 rounded border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-gray-400">Current Profile Image:</p>
                  <button
                    onClick={() => {
                      setAboutData(prev => ({ ...prev, profileImage: '' }))
                      setProfileFiles([])
                    }}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
                <img 
                  src={aboutData.profileImage} 
                  alt="Profile preview" 
                  className="h-16 w-16 object-cover rounded-full"
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Personal Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-electric-teal to-cyan-glow rounded-lg flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white font-cinematic">Personal Information</h2>
            <p className="text-gray-400 font-body">Edit your name, tagline, and description</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white font-semibold mb-2">Name</label>
            <Input
              value={aboutData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Your full name"
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Tagline</label>
            <Input
              value={aboutData.tagline}
              onChange={(e) => handleInputChange('tagline', e.target.value)}
              placeholder="Your professional tagline"
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Description</label>
            <Textarea
              value={aboutData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Tell visitors about yourself, your skills, and what you do"
              rows={6}
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple resize-none"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Email</label>
            <Input
              value={aboutData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your.email@example.com"
              type="email"
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
            />
          </div>
        </div>
      </motion.div>

      {/* Floating Save Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          onClick={handleSave}
          disabled={saving}
          size="lg"
          className="bg-button-gradient hover:shadow-luxury-purple text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Save className="h-5 w-5 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </motion.div>
    </div>
  )
}

export default function AboutMePage() {
  return (
    <AdminAuthWrapper>
      <AboutMeManagement />
    </AdminAuthWrapper>
  )
}
