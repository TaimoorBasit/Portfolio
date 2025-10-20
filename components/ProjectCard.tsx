'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Parse JSON strings if needed with error handling
  let images: string[] = []
  let tags: string[] = []
  let techStack: string[] = []

  try {
    images = typeof project.images === 'string' ? JSON.parse(project.images) : project.images || []
  } catch (error) {
    console.error('Error parsing images:', error)
    images = []
  }

  try {
    tags = typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags || []
  } catch (error) {
    console.error('Error parsing tags:', error)
    tags = []
  }

  try {
    techStack = typeof project.techStack === 'string' ? JSON.parse(project.techStack) : project.techStack || []
  } catch (error) {
    console.error('Error parsing techStack:', error)
    techStack = []
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className="card-luxury group cursor-pointer h-full"
    >
      {/* Image/Video Section */}
      <div className="relative h-48 overflow-hidden rounded-xl mb-6">
        {project.videoUrl ? (
          <video
            src={project.videoUrl}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            muted
            loop
            playsInline
          />
        ) : images.length > 0 ? (
          <img
            src={images[0]}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-electric-purple/20 to-vivid-violet/20 flex items-center justify-center">
            <div className="text-4xl font-heading font-bold text-electric-purple">
              {project.title.charAt(0)}
            </div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.demoUrl && (
            <Button
              size="sm"
              className="bg-button-gradient hover:shadow-luxury-purple text-white backdrop-blur-sm"
              onClick={() => window.open(project.demoUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
          {project.repoUrl && (
            <Button
              size="sm"
              variant="outline"
              className="bg-charcoal/90 hover:bg-charcoal text-white border-electric-purple backdrop-blur-sm"
              onClick={() => window.open(project.repoUrl, '_blank')}
            >
              <Github className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-button-gradient text-white px-3 py-1 rounded-full text-xs font-semibold shadow-luxury-purple">
              FEATURED
            </span>
          </div>
        )}

        {/* Play Button for Videos */}
        {project.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-button-gradient rounded-full flex items-center justify-center backdrop-blur-sm shadow-luxury-purple">
              <Play className="h-6 w-6 text-white ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="space-y-4">
        <h3 className="text-card-title font-heading font-semibold text-white group-hover:text-electric-purple transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-subtext font-text leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-electric-purple/10 text-electric-purple text-xs font-medium rounded-full border border-electric-purple/20"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-3 py-1 bg-charcoal text-subtext text-xs font-medium rounded-full">
              +{tags.length - 3}
            </span>
          )}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {techStack.slice(0, 4).map((tech: string) => (
            <span
              key={tech}
              className="px-2 py-1 bg-vivid-violet/10 text-vivid-violet text-xs font-medium rounded border border-vivid-violet/20"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 4 && (
            <span className="px-2 py-1 bg-charcoal text-subtext text-xs font-medium rounded">
              +{techStack.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}