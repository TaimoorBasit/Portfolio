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
  X,
  Edit,
  Type,
  Heading,
  FileText,
  Settings
} from 'lucide-react'
import { AdminAuthWrapper } from '@/components/AdminAuthWrapper'

interface ContentSection {
  id: string
  key: string
  title: string
  content: string
  type: 'text' | 'heading' | 'description'
  section: string
}

function ContentEditor() {
  const [sections, setSections] = useState<ContentSection[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSection, setEditingSection] = useState<ContentSection | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'text' as 'text' | 'heading' | 'description',
    section: ''
  })

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content')
      const data = await response.json()
      setSections(data)
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const contentData = {
        ...formData,
        key: `${formData.section}_${formData.type}`,
        section: formData.section
      }

      const url = editingSection ? `/api/content/${editingSection.id}` : '/api/content'
      const method = editingSection ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contentData),
      })

      if (response.ok) {
        await fetchContent()
        setShowForm(false)
        setEditingSection(null)
        resetForm()
      }
    } catch (error) {
      console.error('Error saving content:', error)
    }
  }

  const handleEdit = (section: ContentSection) => {
    setEditingSection(section)
    setFormData({
      title: section.title,
      content: section.content,
      type: section.type,
      section: section.section
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      type: 'text',
      section: ''
    })
  }

  const groupedSections = sections.reduce((acc, section) => {
    if (!acc[section.section]) {
      acc[section.section] = []
    }
    acc[section.section].push(section)
    return acc
  }, {} as Record<string, ContentSection[]>)

  const sectionLabels = {
    hero: 'Hero Section',
    about: 'About Section',
    projects: 'Projects Section',
    testimonials: 'Testimonials Section',
    contact: 'Contact Section',
    footer: 'Footer Section'
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
            <h1 className="text-4xl font-bold text-white font-cinematic">Content Editor</h1>
          </div>
          <Button 
            onClick={() => {
              setShowForm(true)
              setEditingSection(null)
              resetForm()
            }}
            className="bg-button-gradient text-white border-0 hover:shadow-luxury-purple"
          >
            <Edit className="h-4 w-4 mr-2" />
            Add New Content
          </Button>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {Object.entries(groupedSections).map(([sectionKey, sectionItems]) => (
            <motion.div
              key={sectionKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <h2 className="text-2xl font-semibold text-white font-cinematic mb-6">
                {sectionLabels[sectionKey as keyof typeof sectionLabels] || sectionKey}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sectionItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gray-800/50 rounded-xl p-4 hover-glow cursor-pointer"
                    onClick={() => handleEdit(item)}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {item.type === 'heading' ? (
                        <Heading className="h-4 w-4 text-electric-purple" />
                      ) : item.type === 'description' ? (
                        <FileText className="h-4 w-4 text-electric-purple" />
                      ) : (
                        <Type className="h-4 w-4 text-electric-purple" />
                      )}
                      <span className="text-sm font-medium text-electric-purple capitalize">
                        {item.type}
                      </span>
                    </div>
                    
                    <h3 className="text-white font-semibold mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-3">{item.content}</p>
                    
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-electric-purple text-electric-purple hover:bg-electric-purple hover:text-white"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gray-900 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white font-cinematic">
                  {editingSection ? 'Edit Content' : 'Add New Content'}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowForm(false)}
                  className="border-gray-600 text-gray-400 hover:bg-gray-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Section</label>
                    <select
                      value={formData.section}
                      onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:border-electric-purple focus:outline-none"
                      required
                    >
                      <option value="">Select a section</option>
                      <option value="hero">Hero Section</option>
                      <option value="about">About Section</option>
                      <option value="projects">Projects Section</option>
                      <option value="testimonials">Testimonials Section</option>
                      <option value="contact">Contact Section</option>
                      <option value="footer">Footer Section</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Content Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as 'text' | 'heading' | 'description' })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:border-electric-purple focus:outline-none"
                      required
                    >
                      <option value="text">Text</option>
                      <option value="heading">Heading</option>
                      <option value="description">Description</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter content title"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Content</label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Enter content text"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                    rows={6}
                    required
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-button-gradient text-white border-0 hover:shadow-luxury-purple"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingSection ? 'Update Content' : 'Create Content'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="border-gray-600 text-gray-400 hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default function ContentEditorPage() {
  return (
    <AdminAuthWrapper>
      <ContentEditor />
    </AdminAuthWrapper>
  )
}
