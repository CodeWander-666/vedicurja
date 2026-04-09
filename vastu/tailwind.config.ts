import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'vastu-parchment': '#F9F6F0',
        'ganga-sandstone': '#C88A5D',
        'nidra-indigo': '#1A2A3A',
        'prakash-gold': '#E8B960',
        'jade-green': '#2D6A4F',
        'burnt-orange': '#E76F51',
        'sky-blue': '#457B9D'
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
        script: ['var(--font-samarkan)', 'cursive']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite'
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        'glow-pulse': { '0%,100%': { opacity: '0.6' }, '50%': { opacity: '1' } }
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
export default config;
