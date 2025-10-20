'use client'

import React, { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

interface WebsiteSettings {
  id: string
  siteName: string
  logo: string
}

export function Navbar() {
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [settings, setSettings] = useState<WebsiteSettings | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      const data = await response.json()
      if (data.length > 0) {
        setSettings(data[0])
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }

  const navItems = [
    { href: '/#projects', label: 'Projects' },
    { href: '/#reviews', label: 'Reviews' },
    { href: '/#contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 bg-obsidian/80 backdrop-blur-md border border-electric-purple/20 rounded-full transition-all duration-500 ease-in-out hover:bg-obsidian/90 hover:border-electric-purple/40 hover:shadow-lg hover:shadow-electric-purple/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300">
              {settings?.logo ? (
                <>
                  <Image
                    src={settings.logo}
                    alt="Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <span className="text-2xl font-bold text-white font-cinematic hover:text-electric-purple transition-colors duration-300">
                    TAIMOOR
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-white font-cinematic hover:text-electric-purple transition-colors duration-300">
                  TAIMOOR
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-electric-purple px-4 py-2 text-sm font-medium transition-all duration-300 uppercase tracking-wide font-body rounded-full hover:bg-electric-purple/10 hover:shadow-md hover:shadow-electric-purple/20"
              >
                {item.label}
              </Link>
            ))}
            
            {session ? (
              <div className="flex items-center space-x-2">
                {session.user.role === 'ADMIN' && (
                  <div className="flex items-center space-x-2">
                    <Link href="/admin">
                      <Button variant="outline" size="sm" className="border-electric-purple text-electric-purple hover:bg-electric-purple hover:text-obsidian transition-all duration-300 rounded-full hover:shadow-md hover:shadow-electric-purple/20">
                        ADMIN
                      </Button>
                    </Link>
                    <Link href="/admin/change-password">
                      <Button variant="outline" size="sm" className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-obsidian transition-all duration-300 rounded-full hover:shadow-md hover:shadow-gray-400/20">
                        CHANGE PASSWORD
                      </Button>
                    </Link>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-obsidian transition-all duration-300 rounded-full hover:shadow-md hover:shadow-gray-400/20"
                >
                  SIGN OUT
                </Button>
              </div>
            ) : null}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-electric-purple transition-all duration-300 rounded-full hover:bg-electric-purple/10"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-charcoal/90 backdrop-blur-md rounded-2xl mt-2 border border-electric-purple/20 transition-all duration-300">
              {/* Mobile Logo */}
              <div className="flex items-center gap-3 px-3 py-2 mb-2">
                {settings?.logo ? (
                  <>
                    <Image
                      src={settings.logo}
                      alt="Logo"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                    <span className="text-lg font-bold text-white font-cinematic">
                      TAIMOOR
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-white font-cinematic">
                    TAIMOOR
                  </span>
                )}
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-electric-purple block px-4 py-3 text-base font-medium transition-all duration-300 uppercase tracking-wide font-body rounded-xl hover:bg-electric-purple/10 hover:shadow-md hover:shadow-electric-purple/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {session && (
                <div className="pt-4 border-t border-gray-600">
                  {session.user.role === 'ADMIN' && (
                    <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full mb-2 border-electric-purple text-electric-purple hover:bg-electric-purple hover:text-obsidian transition-all duration-300 rounded-full hover:shadow-md hover:shadow-electric-purple/20">
                        ADMIN
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      signOut()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-obsidian transition-all duration-300 rounded-full hover:shadow-md hover:shadow-gray-400/20"
                  >
                    SIGN OUT
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}