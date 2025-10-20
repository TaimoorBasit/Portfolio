'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft,
  Upload,
  Image,
  Video,
  File,
  Trash2,
  Download,
  Eye,
  Search,
  Filter
} from 'lucide-react'
import { AdminAuthWrapper } from '@/components/AdminAuthWrapper'
import { FileUpload } from '@/components/FileUpload'

interface MediaFile {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  alt?: string
  category: string
  uploadedBy: string
  createdAt: string
}

function MediaManagement() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])

  useEffect(() => {
    fetchMediaFiles()
  }, [])

  const fetchMediaFiles = async () => {
    try {
      const response = await fetch('/api/media')
      const data = await response.json()
      setMediaFiles(data)
    } catch (error) {
      console.error('Error fetching media files:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      try {
        const response = await fetch(`/api/media/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          await fetchMediaFiles()
        }
      } catch (error) {
        console.error('Error deleting file:', error)
      }
    }
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="h-5 w-5 text-blue-400" />
    if (mimeType.startsWith('video/')) return <Video className="h-5 w-5 text-purple-400" />
    return <File className="h-5 w-5 text-gray-400" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || file.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const categories = ['all', 'projects', 'gallery', 'general']

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
            <h1 className="text-4xl font-bold text-white font-cinematic">Media Library</h1>
          </div>
        </div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-2xl p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold text-white font-cinematic mb-4">Upload New Files</h2>
          <FileUpload
            onUpload={setUploadedFiles}
            multiple={true}
            accept="image/*,video/*"
            maxFiles={20}
            maxSize={100}
          />
        </motion.div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-electric-purple focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-electric-purple focus:outline-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Media Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredFiles.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-xl p-4 group"
            >
              {/* File Preview */}
              <div className="relative h-32 mb-4 bg-gray-800 rounded-lg overflow-hidden">
                {file.mimeType.startsWith('image/') ? (
                  <img
                    src={file.url}
                    alt={file.alt || file.originalName}
                    className="w-full h-full object-cover"
                  />
                ) : file.mimeType.startsWith('video/') ? (
                  <video
                    src={file.url}
                    className="w-full h-full object-cover"
                    muted
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {getFileIcon(file.mimeType)}
                  </div>
                )}
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => window.open(file.url, '_blank')}
                    className="text-white hover:bg-white/20"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => window.open(file.url, '_blank')}
                    className="text-white hover:bg-white/20"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(file.id)}
                    className="text-red-400 hover:bg-red-400/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* File Info */}
              <div className="space-y-2">
                <h3 className="font-semibold text-white text-sm truncate" title={file.originalName}>
                  {file.originalName}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  {getFileIcon(file.mimeType)}
                  <span>{formatFileSize(file.size)}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(file.createdAt).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredFiles.length === 0 && !loading && (
          <div className="text-center py-12">
            <File className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No files found</h3>
            <p className="text-gray-500">Upload some files to get started</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default function MediaManagementPage() {
  return (
    <AdminAuthWrapper>
      <MediaManagement />
    </AdminAuthWrapper>
  )
}