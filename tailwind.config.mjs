/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,svelte,vue}'],
  theme: {
    extend: {
      colors: {
        'cyllor': {
          black:   '#0b0c0b',
          dark:    '#111312',
          darker:  '#0d0f0e',
          surface: '#181a18',
          border:  'rgba(201,169,110,0.18)',
          gold:    '#c9a96e',
          'gold-dim': 'rgba(201,169,110,0.55)',
          'gold-glow': 'rgba(201,169,110,0.12)',
          cream:   '#f0ebe1',
          'cream-dim': 'rgba(240,235,225,0.55)',
          muted:   'rgba(240,235,225,0.35)',
          'green-dark': '#1a2e26',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        serif:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
        body:    ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(5rem, 16vw, 18rem)',
        'section': 'clamp(2.5rem, 6vw, 6rem)',
        'display': 'clamp(3rem, 8vw, 9rem)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideRight: {
          from: { transform: 'scaleX(0)', transformOrigin: 'left' },
          to:   { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'fade-up':    'fadeUp 0.8s ease forwards',
        'fade-in':    'fadeIn 1.2s ease forwards',
        'slide-right': 'slideRight 0.6s ease forwards',
      },
    },
  },
  plugins: [],
};
