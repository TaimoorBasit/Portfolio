import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Simple rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 10 // 10 requests per minute

  const userLimit = rateLimitStore.get(ip)
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (userLimit.count >= maxRequests) {
    return false
  }

  userLimit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log('OpenAI API key not found, returning mock response')
      const body = await request.json()
      const { message } = body
      
      // Return short, precise responses
      const lowerMessage = message.toLowerCase()
      let mockResponse = ""
      
      if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
        mockResponse = `Portfolio: $500-1500 | Business: $1000-3000 | E-commerce: $2000-5000+`
      } else if (lowerMessage.includes('time') || lowerMessage.includes('how long') || lowerMessage.includes('duration')) {
        mockResponse = `Portfolio: 1-2 weeks | Business: 2-4 weeks | E-commerce: 3-6 weeks`
      } else if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
        mockResponse = `I build websites - portfolios, business sites, e-commerce. What do you need?`
      } else if (lowerMessage.includes('portfolio') || lowerMessage.includes('personal website') || lowerMessage.includes('work') || lowerMessage.includes('show')) {
        mockResponse = `Check my featured projects on the main page. 20+ websites built.`
      } else if (lowerMessage.includes('tech') || lowerMessage.includes('technology') || lowerMessage.includes('stack')) {
        mockResponse = `React, Next.js, TypeScript, Node.js, Tailwind CSS`
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('get in touch') || lowerMessage.includes('reach out')) {
        mockResponse = `hello@muhammadtaimoor.com | +92-XXX-XXXXXXX`
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        mockResponse = `Hi! What kind of website do you need?`
      } else {
        mockResponse = `What do you need help with?`
      }
      
      return NextResponse.json({ response: mockResponse })
    }

    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { message } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Sanitize input
    const sanitizedMessage = message.trim().slice(0, 1000)

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are Muhammad Taimoor's AI Assistant. Keep responses VERY SHORT - maximum 1-2 sentences. Be direct and precise.

Examples:
- "What do you build?" → "I build websites - portfolios, business sites, e-commerce. What do you need?"
- "How much does it cost?" → "Portfolio: $500-1500 | Business: $1000-3000 | E-commerce: $2000-5000+"
- "What technologies?" → "React, Next.js, TypeScript, Node.js, Tailwind CSS"
- "How long does it take?" → "Portfolio: 1-2 weeks | Business: 2-4 weeks | E-commerce: 3-6 weeks"

Contact info only if asked: hello@muhammadtaimoor.com, +92-XXX-XXXXXXX`,
        },
        {
          role: 'user',
          content: sanitizedMessage,
        },
      ],
      max_tokens: 100,
      temperature: 0.3,
    })

    const response = completion.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.'

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Error with AI assistant:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

