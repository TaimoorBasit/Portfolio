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
  Eye, 
  Search, 
  Filter,
  ArrowLeft,
  Save,
  X,
  Upload,
  ExternalLink,
  Github,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { AdminAuthWrapper } from '@/components/AdminAuthWrapper'
import { FileUpload } from '@/components/FileUpload'

interface Project {
  id: string
  title: string
  slug: string
  description: string
  images: string | string[]
  technologies: string | string[]
  demoUrl?: string
  githubUrl?: string
  featured: boolean
  tags: string | string[]
  techStack: string | string[]
  createdAt: string
  updatedAt: string
}

function ProjectsManagement() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    technologies: '',
    demoUrl: '',
    githubUrl: '',
    featured: false,
    tags: '',
    techStack: ''
  })
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      console.log('Submitting project:', { editingProject, formData, uploadedFiles })
      
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t),
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        techStack: formData.techStack.split(',').map(t => t.trim()).filter(t => t),
        images: uploadedFiles.length > 0 ? uploadedFiles.map(f => f.url) : ['/placeholder-project.jpg'],
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-')
      }

      console.log('Project data to send:', projectData)

      const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects'
      const method = editingProject ? 'PUT' : 'POST'

      console.log('Making request to:', url, 'with method:', method)

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      })

      console.log('Response status:', response.status)
      
      if (response.ok) {
        console.log('Project saved successfully')
        setMessage({ type: 'success', text: editingProject ? 'Project updated successfully!' : 'Project created successfully!' })
        await fetchProjects()
        setShowForm(false)
        setEditingProject(null)
        resetForm()
        setTimeout(() => setMessage({ type: '', text: '' }), 3000)
      } else {
        const errorData = await response.json()
        console.error('Error response:', errorData)
        setMessage({ type: 'error', text: 'Error saving project: ' + (errorData.error || 'Unknown error') })
        setTimeout(() => setMessage({ type: '', text: '' }), 5000)
      }
    } catch (error) {
      console.error('Error saving project:', error)
      setMessage({ type: 'error', text: 'Error saving project: ' + error })
      setTimeout(() => setMessage({ type: '', text: '' }), 5000)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    
    // Parse JSON strings if they exist
    let technologies = ''
    let tags = ''
    let techStack = ''
    
    try {
      technologies = typeof project.technologies === 'string' ? 
        JSON.parse(project.technologies).join(', ') : 
        Array.isArray(project.technologies) ? project.technologies.join(', ') : String(project.technologies || '')
    } catch (e) {
      technologies = String(project.technologies || '')
    }
    
    try {
      tags = typeof project.tags === 'string' ? 
        JSON.parse(project.tags).join(', ') : 
        Array.isArray(project.tags) ? project.tags.join(', ') : String(project.tags || '')
    } catch (e) {
      tags = String(project.tags || '')
    }
    
    try {
      techStack = typeof project.techStack === 'string' ? 
        JSON.parse(project.techStack).join(', ') : 
        Array.isArray(project.techStack) ? project.techStack.join(', ') : String(project.techStack || '')
    } catch (e) {
      techStack = String(project.techStack || '')
    }
    
    setFormData({
      title: project.title,
      slug: project.slug,
      description: project.description,
      technologies,
      demoUrl: project.demoUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured,
      tags,
      techStack
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          await fetchProjects()
        }
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      technologies: '',
      demoUrl: '',
      githubUrl: '',
      featured: false,
      tags: '',
      techStack: ''
    })
    setUploadedFiles([])
  }

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="border-electric-purple text-electric-purple hover:bg-electric-purple hover:text-white w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-cinematic">Manage Projects</h1>
          </div>
          <Button 
            onClick={() => {
              setShowForm(true)
              setEditingProject(null)
              resetForm()
            }}
            className="bg-button-gradient text-white border-0 hover:shadow-luxury-purple w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Project
          </Button>
        </div>

        {/* Message Display */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg border ${
              message.type === 'success' 
                ? 'bg-green-900/20 border-green-500/30 text-green-400' 
                : 'bg-red-900/20 border-red-500/30 text-red-400'
            }`}
          >
            <div className="flex items-center gap-2">
              {message.type === 'success' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <span className="font-medium">{message.text}</span>
            </div>
          </motion.div>
        )}

        {/* Search and Filter */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple w-full"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-4 lg:p-6 hover-glow"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white font-cinematic">{project.title}</h3>
                {project.featured && (
                  <span className="px-2 py-1 bg-electric-purple text-white text-xs rounded-full self-start">
                    Featured
                  </span>
                )}
              </div>
              
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {Array.isArray(project.technologies) ? project.technologies.slice(0, 3).map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-electric-purple/20 text-electric-purple text-xs rounded">
                    {tech}
                  </span>
                )) : (
                  <span className="px-2 py-1 bg-electric-purple/20 text-electric-purple text-xs rounded">
                    {project.technologies}
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(project)}
                  className="flex-1 border-electric-purple text-electric-purple hover:bg-electric-purple hover:text-white"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(project.id)}
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
              className="bg-gray-900 rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-cinematic">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
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
                    <label className="block text-white font-semibold mb-2">Project Title</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter project title"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Slug</label>
                    <Input
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="project-slug"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter project description"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Project Images & Videos</label>
                  <FileUpload
                    onUpload={setUploadedFiles}
                    multiple={true}
                    accept="image/*,video/*"
                    maxFiles={10}
                    maxSize={50}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Technologies</label>
                    <Input
                      value={formData.technologies}
                      onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                      placeholder="React, Next.js, TypeScript"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Tech Stack</label>
                    <Input
                      value={formData.techStack}
                      onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                      placeholder="Frontend, Backend, Database"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Tags</label>
                  <Input
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="e-commerce, portfolio, business"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Demo URL</label>
                    <Input
                      value={formData.demoUrl}
                      onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                      placeholder="https://example.com"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">GitHub URL</label>
                    <Input
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      placeholder="https://github.com/username/repo"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-electric-purple"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-electric-purple bg-gray-800 border-gray-600 rounded focus:ring-electric-purple"
                  />
                  <label htmlFor="featured" className="text-white font-semibold">
                    Featured Project
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-button-gradient text-white border-0 hover:shadow-luxury-purple"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingProject ? 'Update Project' : 'Create Project'}
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

export default function ProjectsManagementPage() {
  return (
    <AdminAuthWrapper>
      <ProjectsManagement />
    </AdminAuthWrapper>
  )
}