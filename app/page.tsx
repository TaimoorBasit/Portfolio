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
        const [projectsRes, reviewsRes, aboutRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/reviews'),
          fetch('/api/about')
        ])
        
        const projectsData = await projectsRes.json()
        const reviewsData = await reviewsRes.json()
        const aboutData = await aboutRes.json()
        
        // Ensure data is an array before setting state
        setProjects(Array.isArray(projectsData) ? projectsData : [])
        setReviews(Array.isArray(reviewsData) ? reviewsData : [])
        if (Array.isArray(aboutData) && aboutData.length > 0) {
          setAboutData(aboutData[0])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        // Set empty arrays as fallback
        setProjects([])
        setReviews([])
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
        
      {/* Hero Section - Full Screen Cinematic */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-deep-black to-charcoal" />
        <div className="absolute inset-0 bg-purple-glow opacity-30" />
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="space-y-6"
          >
            {/* Main Title */}
            <motion.div
              className="relative inline-block"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.h1 
                className="text-hero font-heading font-black bg-button-gradient bg-clip-text text-transparent leading-tight"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                whileHover={{ textShadow: "0 0 15px rgba(139, 92, 246, 0.4)" }}
              >
                TURNING IDEAS INTO IMMERSIVE DIGITAL REALITY
              </motion.h1>
              <motion.div 
                className="absolute -inset-1 bg-button-gradient opacity-10 blur-sm rounded-lg"
                animate={{ 
                  opacity: [0.1, 0.2, 0.1],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="space-y-3"
            >
              <motion.p 
                className="text-subtitle font-text text-light-gray"
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 15px rgba(139, 92, 246, 0.4)"
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  backgroundPosition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              >
                <span className="bg-gradient-to-r from-white via-electric-purple to-white bg-clip-text text-transparent bg-[length:200%_100%]">
                  Bridging Creativity and Code
                </span>
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="px-8 py-3 text-base font-semibold rounded-full bg-button-gradient text-white border-0 shadow-button-luxury hover:shadow-luxury-purple transition-all duration-300"
                  onClick={() => {
                    const projectsSection = document.getElementById('projects')
                    if (projectsSection) {
                      projectsSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  VIEW PROJECTS →
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-3 text-base font-semibold rounded-full border-2 border-electric-purple text-white bg-transparent hover:bg-electric-purple/10 hover:shadow-luxury-purple transition-all duration-300"
                  onClick={() => {
                    const contactSection = document.getElementById('contact')
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  GET IN TOUCH
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-electric-purple rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-electric-purple rounded-full mt-2"
            />
          </div>
        </motion.div>
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
            {(projects || []).slice(0, 6).map((project, index) => (
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
            ))}
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
            {(reviews || []).slice(0, 3).map((review, index) => (
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