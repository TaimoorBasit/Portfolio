'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react'

// Types
interface AIAssistantMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  sessionId: string
}

interface AIAssistantProps {
  enabled?: boolean
  apiKey?: string
}

export function AIAssistant({ enabled = true, apiKey }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<AIAssistantMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() => `session_${Date.now()}`)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Initialize with welcome message
  useEffect(() => {
    if (enabled && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: "👋 Hi! I'm Taimoor's AI assistant. I can help you understand what kind of websites I build, discuss pricing, or answer questions about my services. How can I help you today?",
          timestamp: new Date(),
          sessionId
        }
      ])
    }
  }, [enabled, messages.length, sessionId])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: AIAssistantMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
      sessionId
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Simulate API call - replace with actual AI service
      const response = await simulateAIResponse(inputValue.trim())

      const assistantMessage: AIAssistantMessage = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        sessionId
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: AIAssistantMessage = {
        id: `error_${Date.now()}`,
        role: 'assistant',
        content: "I'm sorry, I'm having trouble responding right now. Please try again later or contact us directly.",
        timestamp: new Date(),
        sessionId
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const simulateAIResponse = async (input: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200))

    const lowerInput = input.toLowerCase()

    // Website-focused responses
    if (lowerInput.includes('website') || lowerInput.includes('build') || lowerInput.includes('create')) {
      return "🌐 I build modern, responsive websites using React, Next.js, and TypeScript. From portfolio sites to e-commerce platforms - each project is custom-crafted for your needs. What type of website are you looking for?"
    }

    if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('budget')) {
      return "💰 Portfolio sites: $500-1500 | Business websites: $1000-3000 | E-commerce: $2000-5000+ | Custom apps: Quote on request. All projects include responsive design and modern features!"
    }

    if (lowerInput.includes('time') || lowerInput.includes('how long') || lowerInput.includes('duration')) {
      return "⏱️ Portfolio sites: 1-2 weeks | Business websites: 2-4 weeks | E-commerce: 3-6 weeks | Custom apps: 4-8 weeks. I keep you updated throughout the process!"
    }

    if (lowerInput.includes('contact') || lowerInput.includes('get in touch') || lowerInput.includes('reach out')) {
      return "📧 Contact me at hello@muhammadtaimoor.com | 📱 +92-XXX-XXXXXXX | 📅 Book a call: calendly.com/muhammadtaimoor | I respond within 24 hours!"
    }

    if (lowerInput.includes('project') || lowerInput.includes('portfolio') || lowerInput.includes('work') || lowerInput.includes('show')) {
      return "💼 I've built 20+ websites including portfolio sites, business platforms, and e-commerce stores. Check out my featured projects on the main page - each showcases modern design and smooth functionality!"
    }

    if (lowerInput.includes('tech') || lowerInput.includes('technology') || lowerInput.includes('stack')) {
      return "⚡ My tech stack: React, Next.js, TypeScript, Node.js, Tailwind CSS, Framer Motion, Prisma, PostgreSQL. I use the latest tools to create fast, beautiful websites!"
    }

    if (lowerInput.includes('experience') || lowerInput.includes('years') || lowerInput.includes('background')) {
      return "🚀 6+ years building websites and web applications. I specialize in creating user-friendly, modern websites that help businesses grow online. Every project is a new challenge I love tackling!"
    }

    if (lowerInput.includes('service') || lowerInput.includes('what do you do')) {
      return "🎯 I create custom websites that look amazing and work perfectly. From simple portfolio sites to complex e-commerce platforms - I handle everything from design to deployment. What's your vision?"
    }

    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return "👋 Hello! Great to meet you! I'm here to help you understand what kind of websites I can build for you. What brings you here today?"
    }

    if (lowerInput.includes('help') || lowerInput.includes('support')) {
      return "🤝 I'm here to help! I can explain my services, show you examples of my work, discuss pricing, or answer any questions about web development. What would you like to know?"
    }

    // Default responses - more engaging
    const defaultResponses = [
      "🤔 That's interesting! I'd love to help you with that. Can you tell me more about what you're looking for?",
      "💡 Great question! I can definitely help you understand how I can assist with your project. What specific aspect interests you most?",
      "🎨 I'm excited to help! Whether it's about my services, pricing, or what I can build for you - I'm here to answer all your questions!",
      "✨ That sounds like something I can help with! Let me know more details about what you have in mind."
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickActions = [
    "What websites do you build?",
    "How much does it cost?",
    "Show me your work",
    "Contact info"
  ]

  if (!enabled) return null

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-end p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl w-full max-w-md h-[500px] flex flex-col"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">AI Assistant</h3>
                    <p className="text-gray-400 text-sm">Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`flex items-start gap-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === 'user' 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-500'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                          : 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        <p className={`text-xs mt-2 ${
                          message.role === 'user' ? 'text-green-100' : 'text-gray-300'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-3 rounded-2xl border border-white/30 shadow-sm">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-purple-300" />
                          <span className="text-sm">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length === 1 && (
                <div className="p-4 border-t border-white/20">
                  <p className="text-gray-300 text-sm mb-3 font-medium">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action) => (
                      <button
                        key={action}
                        onClick={() => setInputValue(action)}
                        className="px-3 py-2 bg-white/15 hover:bg-white/25 text-white text-xs rounded-full transition-all duration-200 hover:scale-105 border border-white/20"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-white/20">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}