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

export function ParticleSystem() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const colors = [
      'rgba(0, 255, 240, 0.6)',
      'rgba(157, 78, 221, 0.6)',
      'rgba(255, 0, 204, 0.6)',
      'rgba(0, 212, 255, 0.6)',
      'rgba(139, 92, 246, 0.6)',
    ]

    const createParticles = () => {
      const newParticles: Particle[] = []
      
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 15,
        })
      }
      
      setParticles(newParticles)
    }

    createParticles()

    const handleResize = () => {
      createParticles()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
