'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/ProjectCard'
import { Button } from '@/components/ui/button'
import { Filter, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface Project {
  id: string
  title: string
  slug: string
  description: string
  images: string | string[] // Support both JSON string and array
  videoUrl?: string
  tags: string | string[] // Support both JSON string and array
  techStack: string | string[] // Support both JSON string and array
  demoUrl?: string
  repoUrl?: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [projects, searchTerm, selectedTag])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterProjects = () => {
    let filtered = projects

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project => {
        const techStack = typeof project.techStack === 'string' ? JSON.parse(project.techStack) : project.techStack
        return project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
               techStack.some((tech: string) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      })
    }

    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(project => {
        const tags = typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags
        return tags.includes(selectedTag)
      })
    }

    setFilteredProjects(filtered)
  }

  const allTags = Array.from(new Set(projects.flatMap(project => {
    const tags = typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags
    return tags
  })))

  if (loading) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of projects that showcase my skills and passion for creating exceptional digital experiences
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tag Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              {searchTerm || selectedTag !== 'all' 
                ? 'No projects found matching your criteria.' 
                : 'No projects available at the moment.'
              }
            </p>
            {(searchTerm || selectedTag !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedTag('all')
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl font-bold text-primary mb-2">
              {projects.length}
            </div>
            <div className="text-gray-600">Total Projects</div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {projects.filter(p => p.featured).length}
            </div>
            <div className="text-gray-600">Featured</div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {allTags.length}
            </div>
            <div className="text-gray-600">Technologies</div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {projects.reduce((acc, p) => {
                const techStack = typeof p.techStack === 'string' ? JSON.parse(p.techStack) : p.techStack
                return acc + techStack.length
              }, 0)}
            </div>
            <div className="text-gray-600">Tech Stack Items</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
