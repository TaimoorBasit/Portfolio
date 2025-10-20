'use client'

import React, { useEffect, useState } from 'react'

export function AuraLayer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    document.addEventListener('mousemove', updateMousePosition)

    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return (
    <div className="aura-layer">
      {/* Dynamic aura that follows mouse */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(0, 255, 240, 0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
          transition: 'all 0.1s ease-out',
        }}
      />
      
      {/* Secondary aura */}
      <div
        className="absolute w-64 h-64 rounded-full opacity-15 pointer-events-none"
        style={{
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
          background: 'radial-gradient(circle, rgba(157, 78, 221, 0.08) 0%, transparent 70%)',
          filter: 'blur(30px)',
          transition: 'all 0.15s ease-out',
        }}
      />
      
      {/* Tertiary aura */}
      <div
        className="absolute w-32 h-32 rounded-full opacity-10 pointer-events-none"
        style={{
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
          background: 'radial-gradient(circle, rgba(255, 0, 204, 0.06) 0%, transparent 70%)',
          filter: 'blur(20px)',
          transition: 'all 0.2s ease-out',
        }}
      />
    </div>
  )
}
