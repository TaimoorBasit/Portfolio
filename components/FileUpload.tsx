'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Image, Video, File, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileUploadProps {
  onUpload: (files: UploadedFile[]) => void
  multiple?: boolean
  accept?: string
  maxFiles?: number
  maxSize?: number // in MB
  className?: string
  uploadType?: string // Type for upload directory
}

interface UploadedFile {
  url: string
  filename: string
  originalName: string
  size: number
  type: string
  uploadedAt: string
}

export function FileUpload({ 
  onUpload, 
  multiple = true, 
  accept = "image/*,video/*",
  maxFiles = 10,
  maxSize = 50,
  className = "",
  uploadType = "projects"
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('File input changed:', e.target.files)
    const files = Array.from(e.target.files || [])
    console.log('Files selected:', files.length)
    handleFiles(files)
  }

  const handleFiles = async (files: File[]) => {
    setError('')
    
    // Validate file count
    if (files.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`)
      return
    }

    // Validate file types and sizes
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime']
    const maxSizeBytes = maxSize * 1024 * 1024

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        setError(`File type not allowed: ${file.name}`)
        return
      }
      if (file.size > maxSizeBytes) {
        setError(`File too large: ${file.name} (max ${maxSize}MB)`)
        return
      }
    }

    setUploading(true)
    const newUploadedFiles: UploadedFile[] = []

    try {
      for (const file of files) {
        console.log('Uploading file:', file.name, file.size, file.type)
        
        const formData = new FormData()
        formData.append('file', file)
        formData.append('type', uploadType)

        console.log('Sending request to /api/upload-local')

        const response = await fetch('/api/upload-local', {
          method: 'POST',
          body: formData,
        })

        console.log('Upload response status:', response.status)

        if (!response.ok) {
          const errorData = await response.json()
          console.error('Upload error:', errorData)
          throw new Error(errorData.error || 'Upload failed')
        }

        const result = await response.json()
        console.log('Upload result:', result)
        newUploadedFiles.push(result)
      }

      const updatedFiles = [...uploadedFiles, ...newUploadedFiles]
      setUploadedFiles(updatedFiles)
      onUpload(updatedFiles)
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const removeFile = (index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(updatedFiles)
    onUpload(updatedFiles)
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-4 w-4" />
    if (type.startsWith('video/')) return <Video className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-all duration-300 ${
          isDragging
            ? 'border-electric-purple bg-electric-purple/10'
            : 'border-gray-600 hover:border-electric-purple/50'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        </motion.div>

        <h3 className="text-sm font-semibold text-white mb-1">
          {uploading ? 'Uploading...' : 'Upload Files'}
        </h3>
        
        <p className="text-xs text-gray-400 mb-2">
          Drag and drop or click to select
        </p>
        
        <p className="text-xs text-gray-500 mb-2">
          Images only (max {maxSize}MB)
        </p>

        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            console.log('Choose Files button clicked')
            fileInputRef.current?.click()
          }}
          disabled={uploading}
          size="sm"
          className="mt-2 bg-button-gradient hover:shadow-luxury-purple text-white text-xs px-3 py-1"
        >
          {uploading ? 'Uploading...' : 'Choose Files'}
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400"
        >
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm font-medium">{error}</span>
        </motion.div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-1">
          <h4 className="text-xs font-semibold text-white">Uploaded:</h4>
          {uploadedFiles.map((file, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 p-2 bg-gray-800 rounded border border-gray-700"
            >
              {getFileIcon(file.type)}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">
                  {file.originalName}
                </p>
                <p className="text-xs text-gray-400">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  className="text-gray-400 hover:text-red-400"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
