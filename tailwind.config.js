module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Luxury Dark Theme
        'obsidian': '#0A0A0A',
        'deep-black': '#0E0E0E',
        'charcoal': '#1A1A1A',
        'dark-gray': '#2A2A2A',
        'mid-gray': '#3A3A3A',
        
        // Purple Gradient Accents
        'electric-purple': '#9D4EDD',
        'vivid-violet': '#7A1FFF',
        'soft-lilac': '#C084FC',
        'cyan-glow': '#00FFF0',
        
        // Text Colors
        'light-gray': '#DADADA',
        'subtext': '#B0B0B0',
        
        // Glassmorphism
        'glass-white': 'rgba(255, 255, 255, 0.1)',
        'glass-black': 'rgba(0, 0, 0, 0.2)',
        
        // Legacy colors for compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'cinematic': ['Space Grotesk', 'sans-serif'],
        'hero': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'display': ['Space Grotesk', 'sans-serif'],
        'heading': ['Poppins', 'sans-serif'],
        'text': ['Urbanist', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'display': ['clamp(1.5rem, 4vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'subtitle': ['clamp(1rem, 2.5vw, 1.5rem)', { lineHeight: '1.3' }],
        'section-title': ['clamp(1.75rem, 4vw, 2.25rem)', { lineHeight: '1.2' }],
        'card-title': ['clamp(1.125rem, 2vw, 1.25rem)', { lineHeight: '1.3' }],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'aura-drift': 'aura-drift 20s linear infinite',
        'particle-float': 'particle-float 15s ease-in-out infinite',
        'cursor-ripple': 'cursor-ripple 0.6s ease-out',
        'reveal-up': 'reveal-up 0.8s ease-out',
        'reveal-scale': 'reveal-scale 0.6s ease-out',
        'glass-shimmer': 'glass-shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(1deg)' },
          '66%': { transform: 'translateY(10px) rotate(-1deg)' },
        },
        'glow-pulse': {
          '0%': { 
            boxShadow: '0 0 20px rgba(0, 255, 240, 0.3), 0 0 40px rgba(0, 255, 240, 0.1)',
            filter: 'brightness(1)'
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(0, 255, 240, 0.6), 0 0 80px rgba(0, 255, 240, 0.2)',
            filter: 'brightness(1.2)'
          },
        },
        'aura-drift': {
          '0%': { transform: 'translateX(-100%) rotate(0deg)' },
          '100%': { transform: 'translateX(100%) rotate(360deg)' },
        },
        'particle-float': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) scale(1)' },
          '25%': { transform: 'translateY(-30px) translateX(20px) scale(1.1)' },
          '50%': { transform: 'translateY(-60px) translateX(-10px) scale(0.9)' },
          '75%': { transform: 'translateY(-30px) translateX(-20px) scale(1.05)' },
        },
        'cursor-ripple': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        'reveal-up': {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'reveal-scale': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'glass-shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'luxury-purple': '0 0 30px rgba(157, 78, 221, 0.3), 0 0 60px rgba(157, 78, 221, 0.1)',
        'luxury-violet': '0 0 30px rgba(122, 31, 255, 0.3), 0 0 60px rgba(122, 31, 255, 0.1)',
        'luxury-lilac': '0 0 30px rgba(192, 132, 252, 0.3), 0 0 60px rgba(192, 132, 252, 0.1)',
        'glass-luxury': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'card-luxury': '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(157, 78, 221, 0.1)',
        'button-luxury': '0 4px 15px rgba(157, 78, 221, 0.4), 0 0 30px rgba(157, 78, 221, 0.2)',
        'tech-grid': '0 0 0 1px rgba(26, 26, 26, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'luxury-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #1A0A2E 50%, #0E0E0E 100%)',
        'purple-glow': 'radial-gradient(circle at 20% 80%, rgba(157, 78, 221, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(122, 31, 255, 0.15) 0%, transparent 50%)',
        'tech-grid': 'linear-gradient(rgba(26, 26, 26, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 26, 26, 0.1) 1px, transparent 1px)',
        'card-gradient': 'linear-gradient(145deg, #121212 0%, #1A1A1A 100%)',
        'button-gradient': 'linear-gradient(135deg, #9D4EDD 0%, #7A1FFF 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}