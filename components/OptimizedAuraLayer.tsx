'use client'

import React from 'react'

export function OptimizedAuraLayer() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Simplified gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 107, 157, 0.05) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Subtle animated gradient */}
      <div 
        className="absolute inset-0 opacity-20 animate-pulse"
        style={{
          background: `
            linear-gradient(45deg, 
              rgba(0, 212, 255, 0.1) 0%, 
              rgba(124, 58, 237, 0.1) 50%, 
              rgba(255, 107, 157, 0.1) 100%
            )
          `,
          animationDuration: '8s'
        }}
      />
    </div>
  )
}
