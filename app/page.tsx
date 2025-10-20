'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code, Palette, Zap, Star, Mail, Phone, MapPin, ExternalLink, Github } from 'lucide-react'
import { ProjectCard } from '@/components/ProjectCard'
import { ReviewCard } from '@/components/ReviewCard'
import { ContactForm } from '@/components/ContactForm'
import { AIAssistant } from '@/components/AIAssistant'
import { OptimizedParticleSystem as ParticleSystem } from '@/components/OptimizedParticleSystem'
import { OptimizedAuraLayer as AuraLayer } from '@/components/OptimizedAuraLayer'
import { OptimizedMagneticCursor as MagneticCursor } from '@/components/OptimizedMagneticCursor'
import { Footer } from '@/components/Footer'
import { SimpleAIAssistant } from '@/components/SimpleAIAssistant'
import { safeFetch, safeSlice, safeMap } from '@/lib/apiClient'

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

interface ReviewData {
  id: string
  name: string
  company?: string
  content: string
  rating: number
  avatar?: string
  text: string
  createdAt: string
  updatedAt: string
  projectId?: string
  project?: {
    title: string
    slug: string
  }
}

interface AboutMeData {
  id: string
  name: string
  tagline: string
  description: string
  email: string
  profileImage: string
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [reviews, setReviews] = useState<ReviewData[]>([])
  const [aboutData, setAboutData] = useState<AboutMeData | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    document.addEventListener('mousemove', updateMousePosition)
    return () => document.removeEventListener('mousemove', updateMousePosition)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🚀 Starting data fetch on Netlify...')
        console.log('📍 Current URL:', window.location.href)
        console.log('🌐 Base URL:', process.env.NEXT_PUBLIC_API_URL || 'relative')
        
        const [projectsRes, reviewsRes, aboutRes] = await Promise.all([
          safeFetch('/api/projects'),
          safeFetch('/api/reviews'),
          safeFetch('/api/about')
        ])
        
        console.log('📡 API Responses:', { projectsRes, reviewsRes, aboutRes })
        
        // Handle projects response - check both new and old format
        if (projectsRes.success && Array.isArray(projectsRes.data)) {
          console.log('✅ Setting projects from new format:', projectsRes.data.length, 'items')
          setProjects(projectsRes.data)
        } else if (Array.isArray(projectsRes)) {
          // Handle old format (direct array)
          console.log('✅ Setting projects from old format:', projectsRes.length, 'items')
          setProjects(projectsRes)
        } else {
          console.warn('❌ Projects API failed:', projectsRes.error || 'Unknown error')
          console.log('🔄 Using fallback projects data...')
          // Fallback data if API fails
          setProjects([
            {
              id: 'fallback-1',
              title: 'Dellnux Shopify Store',
              slug: 'dellnux-shopify-store',
              description: 'Complete Shopify e-commerce store for Dellnux, featuring custom design, payment integration, inventory management, and mobile optimization.',
              images: JSON.stringify(['/placeholder-project.jpg']),
              technologies: JSON.stringify(['Shopify', 'Liquid', 'JavaScript', 'CSS']),
              demoUrl: 'https://dellnux.com',
              githubUrl: null,
              featured: true,
              tags: JSON.stringify(['E-commerce', 'Shopify', 'Web Development']),
              techStack: JSON.stringify(['Shopify', 'Liquid', 'JavaScript', 'CSS']),
              createdAt: new Date('2024-01-15'),
              updatedAt: new Date('2024-01-15')
            },
            {
              id: 'fallback-2',
              title: 'SevenKoncepts Next.js Website',
              slug: 'sevenkoncepts-nextjs',
              description: 'Modern Next.js website for SevenKoncepts with responsive design, SEO optimization, contact forms, and performance optimization.',
              images: JSON.stringify(['/placeholder-project.jpg']),
              technologies: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Tailwind CSS']),
              demoUrl: 'https://sevenkoncepts.com',
              githubUrl: 'https://github.com/taimoor/sevenkoncepts',
              featured: true,
              tags: JSON.stringify(['Web Development', 'Next.js', 'React', 'SEO']),
              techStack: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Tailwind CSS']),
              createdAt: new Date('2024-02-10'),
              updatedAt: new Date('2024-02-10')
            }
          ])
        }
        
        // Handle reviews response - check both new and old format
        if (reviewsRes.success && Array.isArray(reviewsRes.data)) {
          console.log('✅ Setting reviews from new format:', reviewsRes.data.length, 'items')
          setReviews(reviewsRes.data)
        } else if (Array.isArray(reviewsRes)) {
          // Handle old format (direct array)
          console.log('✅ Setting reviews from old format:', reviewsRes.length, 'items')
          setReviews(reviewsRes)
        } else {
          console.warn('❌ Reviews API failed:', reviewsRes.error || 'Unknown error')
          console.log('🔄 Using fallback reviews data...')
          // Fallback data if API fails
          setReviews([
            {
              id: 'fallback-review-1',
              name: 'Sarah Johnson',
              company: 'Dellnux',
              content: 'Muhammad transformed our e-commerce vision into reality with the Dellnux Shopify store. The custom design perfectly captures our brand identity.',
              text: 'Muhammad transformed our e-commerce vision into reality with the Dellnux Shopify store. The custom design perfectly captures our brand identity.',
              rating: 5,
              projectId: 'fallback-1',
              createdAt: new Date('2024-01-20'),
              updatedAt: new Date('2024-01-20')
            },
            {
              id: 'fallback-review-2',
              name: 'Michael Chen',
              company: 'SevenKoncepts',
              content: 'Working with Muhammad on our Next.js website was an absolute pleasure. He delivered a modern, responsive site that loads incredibly fast.',
              text: 'Working with Muhammad on our Next.js website was an absolute pleasure. He delivered a modern, responsive site that loads incredibly fast.',
              rating: 5,
              projectId: 'fallback-2',
              createdAt: new Date('2024-02-15'),
              updatedAt: new Date('2024-02-15')
            }
          ])
        }
        
        // Handle about response - check both new and old format
        if (aboutRes.success && Array.isArray(aboutRes.data) && aboutRes.data.length > 0) {
          console.log('✅ Setting about data from new format:', aboutRes.data[0])
          setAboutData(aboutRes.data[0])
        } else if (Array.isArray(aboutRes) && aboutRes.length > 0) {
          // Handle old format (direct array)
          console.log('✅ Setting about data from old format:', aboutRes[0])
          setAboutData(aboutRes[0])
        } else {
          console.warn('❌ About API failed:', aboutRes.error || 'Unknown error')
          setAboutData(null)
        }
      } catch (error) {
        console.error('💥 Error fetching data:', error)
        // Set fallback data
        console.log('🔄 Using complete fallback data due to error...')
        setProjects([
          {
            id: 'error-fallback-1',
            title: 'Portfolio Website',
            slug: 'portfolio-website',
            description: 'Personal portfolio website built with Next.js, featuring modern design, smooth animations, and responsive layout.',
            images: JSON.stringify(['/placeholder-project.jpg']),
            technologies: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Framer Motion']),
            demoUrl: 'https://mtaimoor.netlify.app',
            githubUrl: 'https://github.com/TaimoorBasit/Portfolio',
            featured: true,
            tags: JSON.stringify(['Portfolio', 'Next.js', 'React', 'Animation']),
            techStack: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Framer Motion']),
            createdAt: new Date('2024-03-01'),
            updatedAt: new Date('2024-03-01')
          }
        ])
        setReviews([
          {
            id: 'error-fallback-review-1',
            name: 'Client Testimonial',
            company: 'Portfolio Client',
            content: 'Excellent work on the portfolio website. Professional, modern, and exactly what we needed.',
            text: 'Excellent work on the portfolio website. Professional, modern, and exactly what we needed.',
            rating: 5,
            projectId: 'error-fallback-1',
            createdAt: new Date('2024-03-01'),
            updatedAt: new Date('2024-03-01')
          }
        ])
        setAboutData(null)
      }
    }

    fetchData()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  return (
    <div className="min-h-screen bg-obsidian text-white overflow-x-hidden">
      {/* Luxury Background with Tech Grid */}
      <div className="fixed inset-0 bg-luxury-gradient" />
      <div className="fixed inset-0 bg-purple-glow opacity-50" />
      <div className="fixed inset-0 bg-tech-grid opacity-20" style={{ backgroundSize: '50px 50px' }} />
      
      {/* Particle System */}
      <ParticleSystem />
        
      {/* Modern Hero Section */}
      <section className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black" />
        <div className="absolute inset-0 bg-purple-glow opacity-10" />
        
        {/* Header */}
        <motion.header 
          className="relative z-20 px-6 py-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <span className="text-2xl font-bold text-white">mt.</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-purple-500 rounded-full"
              />
            </motion.div>

            {/* Navigation */}
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden md:flex items-center gap-8"
            >
              <motion.a 
                href="#skills" 
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Skills
              </motion.a>
              <motion.a 
                href="#projects" 
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Work
              </motion.a>
              <motion.a 
                href="#reviews" 
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Testimonials
              </motion.a>
            </motion.nav>

            {/* Resume Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
              >
                Download Resume
              </motion.button>
            </motion.div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
          <div className="grid lg:grid-cols-3 gap-12 items-center min-h-[calc(100vh-200px)]">
            
            {/* Left Section - Introduction */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="space-y-8"
            >
              {/* Greeting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <p className="text-gray-400 text-lg">hey, i am</p>
              </motion.div>

              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="space-y-2"
              >
                <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
                  {aboutData?.name?.split(' ')[0] || 'Muhammad'}
                </h1>
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '60px' }}
                    transition={{ duration: 1, delay: 1.4 }}
                    className="h-1 bg-purple-500"
                  />
                  <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
                    {aboutData?.name?.split(' ')[1] || 'Taimoor'}
                  </h1>
                </div>
              </motion.div>

              {/* Contact Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-all duration-300"
                >
                  contact me
                </motion.button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                className="space-y-4"
              >
                <p className="text-gray-400 text-sm">my socials</p>
                <div className="flex items-center gap-6">
                  <motion.a
                    href="https://linkedin.com"
                    whileHover={{ scale: 1.2, color: '#8B5CF6' }}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </motion.a>
                  <div className="w-px h-6 bg-gray-600" />
                  <motion.a
                    href="https://github.com"
                    whileHover={{ scale: 1.2, color: '#8B5CF6' }}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </motion.a>
                  <div className="w-px h-6 bg-gray-600" />
                  <motion.a
                    href="https://twitter.com"
                    whileHover={{ scale: 1.2, color: '#8B5CF6' }}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* Center Section - Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 1 }}
              className="flex justify-center lg:justify-center"
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 0 0 rgba(139, 92, 246, 0.4)',
                    '0 0 0 20px rgba(139, 92, 246, 0)',
                    '0 0 0 0 rgba(139, 92, 246, 0)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative w-80 h-80 lg:w-96 lg:h-96"
              >
                <div className="absolute inset-0 bg-purple-500 rounded-full opacity-20 blur-xl" />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-full h-full bg-purple-500 rounded-full flex items-center justify-center overflow-hidden"
                >
                  {aboutData?.profileImage ? (
                    <img 
                      src={aboutData.profileImage} 
                      alt={aboutData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-white text-6xl font-bold">
                      {aboutData?.name?.charAt(0) || 'M'}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Section - Professional Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="space-y-8"
            >
              {/* Role */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="space-y-2"
              >
                <p className="text-gray-400 text-lg">FULLSTACK</p>
                <h2 className="text-5xl lg:text-6xl font-bold text-white">Web Developer</h2>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <p className="text-gray-300 leading-relaxed">
                  {aboutData?.description || 'I specialize in creating modern, responsive web applications using cutting-edge technologies. From e-commerce solutions to dynamic web platforms, I bring ideas to life with clean code and innovative design.'}
                </p>
              </motion.div>

              {/* Navigation Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                className="flex items-center gap-6"
              >
                <motion.a
                  href="#skills"
                  whileHover={{ scale: 1.05, color: '#8B5CF6' }}
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  my Skills
                </motion.a>
                <div className="w-px h-6 bg-gray-600" />
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05, color: '#8B5CF6' }}
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  my Experience
                </motion.a>
                <div className="w-px h-6 bg-gray-600" />
                <motion.a
                  href="#reviews"
                  whileHover={{ scale: 1.05, color: '#8B5CF6' }}
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  my Art
                </motion.a>
              </motion.div>

              {/* Life Motto */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
                className="space-y-3"
              >
                <p className="text-gray-400 text-sm">my life motto is -</p>
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: '40px' }}
                    transition={{ duration: 1, delay: 2.2 }}
                    className="w-1 bg-purple-500"
                  />
                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 2.4 }}
                    className="text-white italic text-lg"
                  >
                    "Code with passion, build with purpose"
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology / Feature Section */}
      <section className="relative py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-section-title font-heading font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 15px rgba(139, 92, 246, 0.4)"
              }}
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="bg-gradient-to-r from-white via-electric-purple to-white bg-clip-text text-transparent bg-[length:200%_100%]"
              >
                MY EXPERTISE
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-subtitle font-text text-subtext max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                color: "#e5e7eb"
              }}
            >
              Specialized in coding websites with Shopify, WordPress, and Next.js technologies
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Code, title: 'Shopify', desc: 'E-commerce stores, themes, apps' },
              { icon: Palette, title: 'WordPress', desc: 'Landing pages, business sites' },
              { icon: Zap, title: 'Next.js', desc: 'Modern web applications' },
              { icon: Star, title: 'E-commerce', desc: 'Complete online stores' }
            ].map((tech, index) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <motion.div 
                  className="bg-card-gradient rounded-2xl p-8 border border-electric-purple/20 hover:border-electric-purple/40 transition-all duration-300 hover:shadow-card-luxury relative overflow-hidden"
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
                  }}
                >
                  {/* Floating particles */}
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 bg-electric-purple/60 rounded-full"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.6, 1, 0.6],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                  
                  <motion.div 
                    className="w-16 h-16 bg-button-gradient rounded-xl flex items-center justify-center mb-6 group-hover:shadow-luxury-purple transition-all duration-300 relative"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5
                    }}
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(139, 92, 246, 0)",
                        "0 0 20px rgba(139, 92, 246, 0.3)",
                        "0 0 0px rgba(139, 92, 246, 0)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <tech.icon className="h-8 w-8 text-white" />
                    </motion.div>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-lg font-heading font-semibold text-white mb-3"
                    whileHover={{ 
                      scale: 1.05,
                      color: "#8b5cf6"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {tech.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-subtext font-text"
                    whileHover={{ 
                      scale: 1.02,
                      color: "#e5e7eb"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {tech.desc}
                  </motion.p>
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-electric-purple/0 via-electric-purple/5 to-electric-purple/0 rounded-2xl opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-obsidian to-charcoal">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-section-title font-heading font-bold text-white mb-6">
              CLIENT PROJECTS
            </h2>
            <p className="text-subtitle font-text text-subtext max-w-3xl mx-auto">
              Real client projects: Shopify stores, WordPress sites, and Next.js applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {console.log('Projects data:', projects)}
            {console.log('Projects length:', projects?.length)}
            {projects && projects.length > 0 ? (
              safeMap(safeSlice(projects, 0, 6), (project, index) => {
                console.log('Rendering project:', project)
                return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <ProjectCard project={project} />
              </motion.div>
                )
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400 text-lg">Loading projects...</p>
                <p className="text-gray-500 text-sm mt-2">If this persists, check the browser console for errors.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-charcoal to-obsidian">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-section-title font-heading font-bold text-white mb-6">
              CLIENT TESTIMONIALS
            </h2>
            <p className="text-subtitle font-text text-subtext max-w-3xl mx-auto">
              What clients say about working with me
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeMap(safeSlice(reviews, 0, 3), (review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h2 
              className="text-section-title font-heading font-bold text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 15px rgba(139, 92, 246, 0.4)"
              }}
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="bg-gradient-to-r from-white via-electric-purple to-white bg-clip-text text-transparent bg-[length:200%_100%]"
              >
                READY TO BUILD YOUR WEBSITE?
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-subtitle font-text text-subtext max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                color: "#e5e7eb"
              }}
            >
              Need a Shopify store, WordPress site, or Next.js application? Let's discuss your project.
            </motion.p>
            
            {/* Contact Form */}
            <div className="max-w-4xl mx-auto mt-12">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-600/30 shadow-2xl">
                <form className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-3">
                        Full Name
                      </label>
                      <motion.input
                        type="text"
                        placeholder="Your full name"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-electric-purple focus:outline-none transition-all duration-300"
                        whileFocus={{ 
                          scale: 1.02,
                          boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)"
                        }}
                        whileHover={{ 
                          scale: 1.01,
                          borderColor: "rgba(139, 92, 246, 0.5)"
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-3">
                        Email Address
                      </label>
                      <motion.input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-electric-purple focus:outline-none transition-all duration-300"
                        whileFocus={{ 
                          scale: 1.02,
                          boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)"
                        }}
                        whileHover={{ 
                          scale: 1.01,
                          borderColor: "rgba(139, 92, 246, 0.5)"
                        }}
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-white font-semibold mb-3">
                      What type of website do you need?
                    </label>
                    <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-electric-purple focus:outline-none transition-colors">
                      <option value="">Select project type</option>
                      <option value="shopify">Shopify E-commerce Store</option>
                      <option value="wordpress">WordPress Landing Page</option>
                      <option value="nextjs">Next.js Application</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-white font-semibold mb-3">
                      Project Description
                    </label>
                    <textarea
                      placeholder="Tell me about your business and what you need..."
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-electric-purple focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label className="block text-white font-semibold mb-3">
                      Estimated Budget Range
                    </label>
                    <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-electric-purple focus:outline-none transition-colors">
                      <option value="">Select budget range</option>
                      <option value="500-1500">$500 - $1,500 (WordPress Landing Page)</option>
                      <option value="1500-3000">$1,500 - $3,000 (Next.js Application)</option>
                      <option value="3000-5000">$3,000 - $5,000 (Shopify Store)</option>
                      <option value="5000+">$5,000+ (Complex E-commerce)</option>
                    </select>
                  </div>

                  {/* Biggest Challenge */}
                  <div>
                    <label className="block text-white font-semibold mb-3">
                      Your Biggest Challenge Right Now
                    </label>
                    <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-electric-purple focus:outline-none transition-colors">
                      <option value="">Select your main challenge</option>
                      <option value="no-website">I don't have a website yet</option>
                      <option value="outdated-design">My current website looks outdated</option>
                      <option value="slow-loading">Website is too slow</option>
                      <option value="mobile-issues">Not mobile-friendly</option>
                      <option value="no-ecommerce">Need to sell products online</option>
                      <option value="seo-problems">Not getting found on Google</option>
                      <option value="conversion">Low sales/conversions</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <motion.div
                      whileHover={{ 
                        scale: 1.05,
                        y: -2
                      }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        boxShadow: [
                          "0 10px 30px rgba(139, 92, 246, 0.3)",
                          "0 15px 40px rgba(139, 92, 246, 0.5)",
                          "0 10px 30px rgba(139, 92, 246, 0.3)"
                        ]
                      }}
                      transition={{
                        boxShadow: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      <motion.div
                        whileHover={{
                          background: "linear-gradient(45deg, #8b5cf6, #a855f7, #c084fc)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Button 
                          type="submit"
                          size="lg" 
                          className="w-full px-8 py-4 text-lg font-semibold rounded-full bg-button-gradient text-white border-0 shadow-button-luxury hover:shadow-luxury-purple transition-all duration-300 relative overflow-hidden"
                          onClick={(e) => {
                            e.preventDefault()
                            alert('Thank you for your interest! I will get back to you soon.')
                          }}
                        >
                          <motion.span
                            animate={{
                              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                            className="relative z-10"
                          >
                            SEND MESSAGE
                          </motion.span>
                          
                          {/* Shimmer effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{
                              x: ["-100%", "100%"]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Personal Statement Section */}
      <section className="relative py-8 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Compact Personal Card */}
            <motion.div 
              className="bg-gray-800/60 rounded-xl p-5 border border-gray-600/30 transition-all duration-300 hover:border-electric-purple/60 hover:shadow-lg hover:shadow-electric-purple/20 hover:bg-gray-800/80"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-4">
                {/* Profile Picture */}
                <motion.div 
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-500/30 flex-shrink-0 overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {aboutData?.profileImage ? (
                    <Image
                      src={aboutData.profileImage}
                      alt={aboutData.name || "Profile"}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-electric-purple/40 to-vivid-violet/40 rounded-full flex items-center justify-center">
                      <motion.div 
                        className="text-sm font-bold text-white"
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        MT
                      </motion.div>
                    </div>
                  )}
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Name and Tagline */}
                  <motion.div 
                    className="mb-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h3 className="text-lg font-bold text-white transition-colors duration-300 hover:text-electric-purple">
                      {aboutData?.name || "Muhammad Taimoor"} | {aboutData?.tagline || "Your Vision, Digital Reality."}
                    </h3>
                  </motion.div>

                  {/* Personal Statement */}
                  <motion.p 
                    className="text-sm text-gray-300 leading-relaxed transition-colors duration-300 hover:text-gray-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {aboutData?.description || "I specialize in Shopify e-commerce stores, WordPress landing pages, and Next.js applications. From Dellnux's complete Shopify store to SevenKoncepts' Next.js website, I deliver results. When you hire me, you work directly with me. No project managers, no hand-offs. Just a direct line to your successful online presence."}
                  </motion.p>

                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-4 pt-3 border-t border-gray-600/20">
                    <div className="flex items-center gap-2 text-xs text-subtext">
                      <Mail className="h-4 w-4 text-electric-purple" />
                      <span>{aboutData?.email || "taimoor@gmail.com"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Simple AI Assistant */}
      <SimpleAIAssistant />
    </div>
  )
}