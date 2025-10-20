'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  ArrowLeft,
  Save,
  X,
  Star,
  User
} from 'lucide-react'
import { AdminAuthWrapper } from '@/components/AdminAuthWrapper'

interface Review {
  id: string
  name: string
  company?: string
  content: string
  rating: number
  avatar?: string
  text: string
  createdAt: string
  updatedAt: string
  projectId?: string
  project?: {
    title: string
    slug: string
  }
}

function ReviewsManagement() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    content: '',
    text: '',
    rating: 5,
    projectId: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [reviewsRes, projectsRes] = await Promise.all([
        fetch('/api/reviews'),
        fetch('/api/projects')
      ])
      
      const reviewsData = await reviewsRes.json()
      const projectsData = await projectsRes.json()
      
      setReviews(reviewsData)
      setProjects(projectsData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const reviewData = {
        ...formData,
        text: formData.content, // Use content as text
        projectId: formData.projectId || null
      }

      const url = editingReview ? `/api/reviews/${editingReview.id}` : '/api/reviews'
      const method = editingReview ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      })

      if (response.ok) {
        await fetchData()
        setShowForm(false)
        setEditingReview(null)
        resetForm()
      }
    } catch (error) {
      console.error('Error saving review:', error)
    }
  }

  const handleEdit = (review: Review) => {
    setEditingReview(review)
    setFormData({
      name: review.name,
      company: review.company || '',
      content: review.content,
      text: review.text,
      rating: review.rating,
      projectId: review.projectId || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      try {
        const response = await fetch(`/api/reviews/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          await fetchData()
        }
      } catch (error) {
        console.error('Error deleting review:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      content: '',
      text: '',
      rating: 5,
      projectId: ''
    })
  }

  const filteredReviews = reviews.filter(review =>
    review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (review.company && review.company.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ))
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
            <h1 className="text-4xl font-bold text-white font-cinematic">Manage Reviews</h1>
          </div>
          <Button 
            onClick={() => {
              setShowForm(true)
              setEditingReview(null)
              resetForm()
            }}
            className="bg-button-gradient text-white border-0 hover:shadow-luxury-purple"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Review
          </Button>
        </div>

        {/* Search */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
            />
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 hover-glow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-electric-purple to-violet-glow rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white font-cinematic">{review.name}</h3>
                  {review.company && (
                    <p className="text-sm text-gray-400">{review.company}</p>
                  )}
                  <div className="flex items-center gap-1 mt-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-4 line-clamp-4">{review.content}</p>
              
              {review.project && (
                <div className="mb-4">
                  <span className="px-2 py-1 bg-electric-purple/20 text-electric-purple text-xs rounded">
                    {review.project.title}
                  </span>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(review)}
                  className="flex-1 border-electric-purple text-electric-purple hover:bg-electric-purple hover:text-white"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(review.id)}
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
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
                  {editingReview ? 'Edit Review' : 'Add New Review'}
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
                    <label className="block text-white font-semibold mb-2">Client Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter client name"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Company (Optional)</label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Enter company name"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Review Content</label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Enter review content"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Rating</label>
                    <select
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:border-electric-purple focus:outline-none"
                    >
                      <option value={1}>1 Star</option>
                      <option value={2}>2 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={5}>5 Stars</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Related Project (Optional)</label>
                    <select
                      value={formData.projectId}
                      onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:border-electric-purple focus:outline-none"
                    >
                      <option value="">Select a project</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-button-gradient text-white border-0 hover:shadow-luxury-purple"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingReview ? 'Update Review' : 'Create Review'}
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

export default function ReviewsManagementPage() {
  return (
    <AdminAuthWrapper>
      <ReviewsManagement />
    </AdminAuthWrapper>
  )
}