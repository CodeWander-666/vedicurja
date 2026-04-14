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
      animation: { 'gradient-x': 'gradient-x 12s ease infinite' },
      keyframes: {
        'gradient-x': {
          '0%,100%': { 'background-size':'200% 200%','background-position':'left center' },
          '50%': { 'background-size':'200% 200%','background-position':'right center' },
        },
      },
      boxShadow: {
        'luxury-md':'0 10px 15px -3px rgba(26,42,58,0.08)',
        'luxury-lg':'0 20px 25px -5px rgba(26,42,58,0.1)',
      },
    },
  },
  plugins: [],
}
export default config
