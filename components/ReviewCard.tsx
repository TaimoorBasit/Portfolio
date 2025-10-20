'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface Review {
  id: string
  name: string
  company?: string
  rating: number
  text: string
  projectId?: string
  createdAt: string
  updatedAt: string
  project?: {
    title: string
    slug: string
  }
}

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className="card-luxury group"
    >
      {/* Rating Stars */}
      <div className="flex items-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < review.rating
                ? 'text-electric-purple fill-current'
                : 'text-charcoal'
            }`}
          />
        ))}
      </div>

      {/* Review Text */}
      <blockquote className="text-light-gray mb-6 font-text leading-relaxed italic text-lg">
        "{review.text}"
      </blockquote>

      {/* Client Info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-button-gradient rounded-full flex items-center justify-center shadow-luxury-purple">
          <span className="text-white font-bold font-heading">
            {review.name.charAt(0)}
          </span>
        </div>
        <div>
          <h4 className="font-semibold text-white font-heading">
            {review.name}
          </h4>
          {review.company && (
            <p className="text-sm text-subtext font-text">
              {review.company}
            </p>
          )}
          {review.project && (
            <p className="text-xs text-electric-purple font-text">
              Project: {review.project.title}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}