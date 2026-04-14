import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'sacred-saffron': '#FF9933',
        'kumkuma-red': '#C10000',
        'prakash-gold': '#E8B960',
        'vastu-parchment': '#FDFBF7',
        'vastu-stone': '#F4EFE6',
        'nidra-indigo': '#1A2A3A',
      },
      animation: {
        'gradient-x': 'gradient-x 12s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'luxury-md': '0 10px 15px -3px rgba(26,42,58,0.08)',
        'luxury-lg': '0 20px 25px -5px rgba(26,42,58,0.1)',
        'gold-glow': '0 0 20px rgba(232,185,96,0.3)',
      },
    },
  },
  plugins: [],
}
export default config
