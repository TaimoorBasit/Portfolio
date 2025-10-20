'use client'

import React, { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  delay: number
}

export function OptimizedParticleSystem() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const colors = [
      'rgba(0, 255, 240, 0.4)',
      'rgba(157, 78, 221, 0.4)',
      'rgba(255, 0, 204, 0.4)',
    ]

    const createParticles = () => {
      const newParticles: Particle[] = []
      
      // Reduced particle count for better performance
      for (let i = 0; i < 25; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
          y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
          size: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 2,
        })
      }
      
      setParticles(newParticles)
    }

    createParticles()

    const handleResize = () => {
      createParticles()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: '3s',
          }}
        />
      ))}
    </div>
  )
}
