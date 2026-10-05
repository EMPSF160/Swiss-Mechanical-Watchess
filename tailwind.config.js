/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        luxury: {
          dark: '#08090C',
          card: '#0E1118',
          cardElevated: '#151922',
          border: 'rgba(212, 175, 55, 0.18)',
          borderHover: 'rgba(212, 175, 55, 0.45)',
          gold: '#D4AF37',
          goldLight: '#F3E5AB',
          goldMuted: '#997D33',
          roseGold: '#C58F80',
          platinum: '#E2E8F0',
          silver: '#94A3B8',
          charcoal: '#1A1E29',
          deepBlue: '#0A0F1D'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Montserrat"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #FFF2B2 50%, #AA8221 100%)',
        'gold-text': 'linear-gradient(135deg, #E6CA65 0%, #FAF0CD 50%, #C49A32 100%)',
        'dark-radial': 'radial-gradient(ellipse at center, #151924 0%, #08090C 100%)',
        'luxury-shimmer': 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.15), transparent)',
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'spin-reverse-slow': 'spinReverse 40s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'tick': 'tick 1s steps(1) infinite',
      },
      keyframes: {
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        tick: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(6deg)' },
          '100%': { transform: 'rotate(0deg)' }
        }
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'gold-glow-lg': '0 0 45px rgba(212, 175, 55, 0.35)',
        'inner-gold': 'inset 0 0 15px rgba(212, 175, 55, 0.1)',
        'luxury-card': '0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(212, 175, 55, 0.15)'
      }
    },
  },
  plugins: [],
}
