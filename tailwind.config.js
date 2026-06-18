/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'void': '#050407',
        'castle-deep': '#0D0810',
        'stone': '#160F14',
        'stone-mid': '#241820',
        
        'crimson-lo': '#8B1A1A',
        'crimson': '#C0392B',
        'crimson-hi': '#E53935',
        'crimson-bloom': '#FF6B6B',
        
        'ember': '#8B5E1A',
        'gold': '#D4A054',
        'gold-bright': '#F0C070',
        'gold-fire': '#FFD700',
        
        'text-primary': '#EDE8E0',
        'text-body': '#A89880',
        'text-ghost': '#4A3A35',
        
        'petal-1': '#E8C4C4',
        'petal-2': '#C4687A',
        'petal-3': '#8B3A50',
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', 'serif'],
        heading: ['"Cinzel"', 'serif'],
        body: ['"EB Garamond"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        none: '0',
        sm: '1px',
        DEFAULT: '2px',
        md: '3px',
        lg: '3px',
        xl: '3px',
        '2xl': '3px',
        '3xl': '3px',
        full: '9999px',
      },
    },
  },
  plugins: [],
}

