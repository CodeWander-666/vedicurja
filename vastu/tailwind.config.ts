import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'vastu-parchment': '#F9F6F0',
        'ganga-sandstone': '#C88A5D',
        'nidra-indigo': '#1A2A3A',
        'prakash-gold': '#E8B960',
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'bg-elevated': 'var(--bg-elevated)',
        'surface-card': 'var(--surface-card)',
        'surface-overlay': 'var(--surface-overlay)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'border-light': 'var(--border-light)',
        'border-strong': 'var(--border-strong)',
        'shadow-sm': 'var(--shadow-sm)',
        'shadow-md': 'var(--shadow-md)',
        'shadow-lg': 'var(--shadow-lg)',
        'shadow-glow': 'var(--shadow-glow)',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      boxShadow: {
        'luxury-sm': 'var(--shadow-sm)',
        'luxury-md': 'var(--shadow-md)',
        'luxury-lg': 'var(--shadow-lg)',
        'luxury-glow': 'var(--shadow-glow)',
      },
    },
  },
  plugins: [],
};

export default config;
