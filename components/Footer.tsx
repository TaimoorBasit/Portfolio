'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/muhammadtaimoor', icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/muhammadtaimoor', icon: Linkedin },
    { name: 'Twitter', href: 'https://twitter.com/muhammadtaimoor', icon: Twitter },
    { name: 'Instagram', href: 'https://instagram.com/muhammadtaimoor', icon: Instagram },
  ]

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="relative bg-gradient-to-t from-charcoal to-obsidian border-t border-electric-purple/20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-subtext font-text text-sm">
            © {currentYear} Muhammad Taimoor. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 bg-card-gradient rounded-lg flex items-center justify-center border border-electric-purple/20 hover:border-electric-purple/40 transition-all duration-300"
              >
                <social.icon className="h-4 w-4 text-electric-purple" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}