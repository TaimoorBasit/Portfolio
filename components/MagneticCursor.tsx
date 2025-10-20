'use client'

import React, { useEffect, useRef, useState } from 'react'

interface MagneticParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  originalX: number
  originalY: number
  pulsePhase: number
  rotation: number
}

interface MagneticCursorProps {
  children: React.ReactNode
}

export function MagneticCursor({ children }: MagneticCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<MagneticParticle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()
  const [isHovering, setIsHovering] = useState(false)
  const [cursorGlow, setCursorGlow] = useState({ x: 0, y: 0, intensity: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 12000)
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.6 + 0.3,
          color: Math.random() > 0.6 ? '#00D4FF' : Math.random() > 0.3 ? '#7C3AED' : '#FF6B9D',
          originalX: 0,
          originalY: 0,
          pulsePhase: Math.random() * Math.PI * 2,
          rotation: Math.random() * Math.PI * 2,
        })
      }
    }

    initParticles()

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      setCursorGlow({ x: e.clientX, y: e.clientY, intensity: 1 })
    }

    // Mouse enter/leave handlers
    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => {
      setIsHovering(false)
      setCursorGlow(prev => ({ ...prev, intensity: 0 }))
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update cursor glow intensity
      setCursorGlow(prev => ({
        ...prev,
        intensity: Math.max(0, prev.intensity - 0.02)
      }))

      particlesRef.current.forEach((particle, index) => {
        // Calculate distance from mouse
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Magnetic effect
        const maxDistance = 200
        const force = Math.max(0, maxDistance - distance) / maxDistance
        const angle = Math.atan2(dy, dx)

        if (distance < maxDistance && isHovering) {
          // Attract particles to cursor with varying strength
          const attractionForce = force * 0.03 * (1 + Math.sin(particle.pulsePhase) * 0.5)
          particle.vx += Math.cos(angle) * attractionForce
          particle.vy += Math.sin(angle) * attractionForce
          
          // Increase opacity and size when near cursor
          particle.opacity = Math.min(1, particle.opacity + force * 0.15)
          particle.size = Math.min(6, particle.size + force * 0.5)
          
          // Add rotation effect
          particle.rotation += force * 0.1
        } else {
          // Return to original state
          particle.vx *= 0.95
          particle.vy *= 0.95
          particle.opacity = Math.max(0.3, particle.opacity - 0.008)
          particle.size = Math.max(1, particle.size - 0.02)
        }

        // Update pulse phase
        particle.pulsePhase += 0.02

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Keep particles in bounds with soft bounce
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.7
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.7
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        // Draw particle with enhanced effects
        ctx.save()
        ctx.globalAlpha = particle.opacity
        
        // Create gradient for particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        )
        gradient.addColorStop(0, particle.color)
        gradient.addColorStop(0.7, particle.color + '80')
        gradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Add pulsing effect
        if (distance < maxDistance && isHovering) {
          const pulseSize = particle.size + Math.sin(particle.pulsePhase) * 2
          const pulseOpacity = particle.opacity * 0.3
          
          ctx.globalAlpha = pulseOpacity
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      })

      // Draw connections between nearby particles
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.3
            ctx.save()
            ctx.globalAlpha = opacity
            
            // Create gradient line
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            )
            gradient.addColorStop(0, particle.color)
            gradient.addColorStop(1, otherParticle.color)
            
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })

      // Draw cursor glow effect
      if (cursorGlow.intensity > 0) {
        ctx.save()
        ctx.globalAlpha = cursorGlow.intensity * 0.3
        const gradient = ctx.createRadialGradient(
          cursorGlow.x, cursorGlow.y, 0,
          cursorGlow.x, cursorGlow.y, 100
        )
        gradient.addColorStop(0, '#00D4FF')
        gradient.addColorStop(0.5, '#7C3AED')
        gradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(cursorGlow.x, cursorGlow.y, 100, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovering, cursorGlow])

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ background: 'transparent' }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
