'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Trash2, Mail, MailOpen, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact')
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ read: true }),
      })

      if (response.ok) {
        setMessages(messages.map(msg => 
          msg.id === id ? { ...msg, read: true } : msg
        ))
        if (selectedMessage?.id === id) {
          setSelectedMessage({ ...selectedMessage, read: true })
        }
      }
    } catch (error) {
      console.error('Error marking message as read:', error)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setMessages(messages.filter(msg => msg.id !== id))
        if (selectedMessage?.id === id) {
          setSelectedMessage(null)
        }
      } else {
        alert('Failed to delete message')
      }
    } catch (error) {
      console.error('Error deleting message:', error)
      alert('Failed to delete message')
    }
  }

  const unreadCount = messages.filter(msg => !msg.read).length

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-teal"></div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-obsidian text-white min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-white font-cinematic">Messages</h1>
          {unreadCount > 0 && (
            <p className="text-electric-teal mt-2 font-body">
              {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white font-cinematic">All Messages</h2>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                  <p>No messages yet</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className={`p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors ${
                      !message.read ? 'bg-electric-teal/5 border-l-4 border-l-electric-teal' : ''
                    } ${selectedMessage?.id === message.id ? 'bg-gray-800' : ''}`}
                    onClick={() => {
                      setSelectedMessage(message)
                      if (!message.read) {
                        markAsRead(message.id)
                      }
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white text-sm font-cinematic">
                            {message.name}
                          </h3>
                          {!message.read && (
                            <div className="w-2 h-2 bg-electric-teal rounded-full"></div>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm font-body truncate">
                          {message.subject}
                        </p>
                        <p className="text-gray-500 text-xs font-body">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card rounded-lg shadow-md p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white font-cinematic">
                    {selectedMessage.subject}
                  </h2>
                  <div className="mt-2 space-y-1">
                    <p className="text-gray-300 font-body">
                      <span className="text-gray-400">From:</span> {selectedMessage.name}
                    </p>
                    <p className="text-gray-300 font-body">
                      <span className="text-gray-400">Email:</span> {selectedMessage.email}
                    </p>
                    <p className="text-gray-300 font-body">
                      <span className="text-gray-400">Date:</span> {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!selectedMessage.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsRead(selectedMessage.id)}
                      className="border-electric-teal text-electric-teal hover:bg-electric-teal hover:text-obsidian"
                    >
                      <MailOpen className="h-4 w-4 mr-2" />
                      Mark Read
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4 font-cinematic">Message</h3>
                <div className="bg-dark-gray rounded-lg p-4">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap font-body">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card rounded-lg shadow-md p-12 text-center"
            >
              <Eye className="h-16 w-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2 font-cinematic">
                Select a Message
              </h3>
              <p className="text-gray-500 font-body">
                Choose a message from the list to view its details
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
