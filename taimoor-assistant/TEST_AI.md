# AI Assistant Testing Guide

## Quick Test

1. **Start Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Test AI Responses**:
   ```bash
   node test-ai.js
   ```

## Expected Short Responses

- **"What websites do you build?"** → "Portfolio sites, e-commerce, business websites. What do you need?"
- **"How much does it cost?"** → "Portfolio: $500-1500, Business: $1000-3000, E-commerce: $2000-5000+"
- **"What technologies?"** → "React, Next.js, TypeScript, Node.js, PostgreSQL"
- **"How long does it take?"** → "Portfolio: 1-2 weeks, Business: 2-4 weeks, E-commerce: 3-6 weeks"
- **"Contact info"** → "hello@muhammadtaimoor.com, +92-XXX-XXXXXXX, https://calendly.com/muhammadtaimoor"

## Key Features

✅ **Short Responses**: Maximum 1-2 sentences  
✅ **Precise Answers**: Direct, no fluff  
✅ **Auto-Scroll**: New messages appear instantly  
✅ **End Chat**: Type "end chat" to close  
✅ **Quick Replies**: Direct question buttons  

## Troubleshooting

- **Long responses**: Check system prompt and max_tokens
- **No auto-scroll**: Check useEffect dependencies
- **Not working**: Verify backend is running on port 3001
