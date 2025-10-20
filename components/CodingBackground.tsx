'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export function CodingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Animation 1: Matrix Rain
    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?'
    const matrixDrops: Array<{ x: number; y: number; speed: number; chars: string[] }> = []
    
    for (let i = 0; i < Math.floor(canvas.width / 20); i++) {
      matrixDrops.push({
        x: i * 20,
        y: Math.random() * canvas.height,
        speed: Math.random() * 3 + 1,
        chars: Array.from({ length: 20 }, () => matrixChars[Math.floor(Math.random() * matrixChars.length)])
      })
    }

    // Animation 2: Floating Code Blocks
    const codeBlocks: Array<{ x: number; y: number; vx: number; vy: number; text: string; opacity: number }> = []
    const codeSnippets = [
      'function createApp() {',
      'const user = { name: "John" }',
      'import React from "react"',
      'export default Component',
      'async function fetchData() {',
      'return { success: true }',
      'class UserService {',
      'interface User { id: number }',
      'type Status = "loading" | "success"',
      'const api = await fetch(url)'
    ]

    for (let i = 0; i < 15; i++) {
      codeBlocks.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        opacity: Math.random() * 0.6 + 0.2
      })
    }

    // Animation 3: Binary Rain
    const binaryDrops: Array<{ x: number; y: number; speed: number; bits: string[] }> = []
    
    for (let i = 0; i < Math.floor(canvas.width / 15); i++) {
      binaryDrops.push({
        x: i * 15,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 0.5,
        bits: Array.from({ length: 15 }, () => Math.random() > 0.5 ? '1' : '0')
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw Matrix Rain
      matrixDrops.forEach(drop => {
        ctx.fillStyle = 'rgba(139, 92, 246, 0.3)'
        ctx.font = '14px monospace'
        
        drop.chars.forEach((char, index) => {
          const y = drop.y - (index * 20)
          if (y > 0) {
            ctx.fillText(char, drop.x, y)
          }
        })

        drop.y += drop.speed
        if (drop.y > canvas.height + 400) {
          drop.y = -400
        }
      })

      // Draw Floating Code Blocks
      codeBlocks.forEach(block => {
        ctx.fillStyle = `rgba(6, 182, 212, ${block.opacity})`
        ctx.font = '12px monospace'
        ctx.fillText(block.text, block.x, block.y)

        block.x += block.vx
        block.y += block.vy

        if (block.x < 0 || block.x > canvas.width) block.vx *= -1
        if (block.y < 0 || block.y > canvas.height) block.vy *= -1

        block.x = Math.max(0, Math.min(canvas.width, block.x))
        block.y = Math.max(0, Math.min(canvas.height, block.y))
      })

      // Draw Binary Rain
      binaryDrops.forEach(drop => {
        ctx.fillStyle = 'rgba(16, 185, 129, 0.2)'
        ctx.font = '10px monospace'
        
        drop.bits.forEach((bit, index) => {
          const y = drop.y - (index * 15)
          if (y > 0) {
            ctx.fillText(bit, drop.x, y)
          }
        })

        drop.y += drop.speed
        if (drop.y > canvas.height + 225) {
          drop.y = -225
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isClient])

  if (!isClient) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-obsidian via-purple-900/20 to-obsidian" />
    )
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />

      {/* Subtle Geometric Patterns */}
      <div className="absolute inset-0">
        {/* Floating Geometric Shapes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-electric-purple/20 pointer-events-none"
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Elegant Code Lines */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-electric-purple/30 to-transparent pointer-events-none"
            style={{
              width: `${200 + i * 50}px`,
              left: `${20 + i * 10}%`,
              top: `${30 + i * 8}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scaleX: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-lg font-mono text-electric-purple/15 pointer-events-none"
            style={{
              left: `${15 + i * 15}%`,
              top: `${25 + (i % 2) * 30}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 8 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            {['</>', '{}', '[]', '()', '=>', '++'][i]}
          </motion.div>
        ))}
      </div>

      {/* Subtle Grid Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '80px 80px'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Elegant Pulsing Orbs */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)`,
              left: `${25 + i * 25}%`,
              top: `${35 + i * 15}%`,
            }}
            animate={{
              scale: [0.8, 1.5, 0.8],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 12 + i * 1,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Canvas Animations (Subtle) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ background: 'transparent' }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-obsidian/20 to-obsidian/40" />
    </div>
  )
}