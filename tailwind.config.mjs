/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,svelte,vue}'],
  theme: {
    extend: {
      colors: {
        'cyllor': {
          dark:    '#050505',
          darker:  '#080808',
          surface: '#0e0e0e',
          border:  '#1a1a1a',
          cyan:    '#00f0ff',
          'cyan-dim': '#00b8c4',
          'cyan-glow': 'rgba(0,240,255,0.15)',
          silver:  '#c0c8d8',
          'silver-dim': '#7a8494',
          muted:   '#3a3a4a',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
        body:    ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(4rem, 12vw, 14rem)',
        'section': 'clamp(2rem, 5vw, 5rem)',
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(0,240,255,0.04) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0,240,255,0.04) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      keyframes: {
        glitch1: {
          '0%, 100%': { clipPath: 'inset(0 0 100% 0)', transform: 'skewX(0deg)' },
          '5%':        { clipPath: 'inset(10% 0 80% 0)', transform: 'skewX(-2deg)' },
          '10%':       { clipPath: 'inset(60% 0 30% 0)', transform: 'skewX(2deg)' },
          '15%':       { clipPath: 'inset(40% 0 50% 0)', transform: 'skewX(-1deg)' },
          '20%':       { clipPath: 'inset(0 0 100% 0)', transform: 'skewX(0deg)' },
        },
        glitch2: {
          '0%, 100%': { clipPath: 'inset(100% 0 0 0)', transform: 'skewX(0deg)' },
          '7%':        { clipPath: 'inset(70% 0 10% 0)', transform: 'skewX(1deg)' },
          '12%':       { clipPath: 'inset(30% 0 60% 0)', transform: 'skewX(-2deg)' },
          '17%':       { clipPath: 'inset(50% 0 30% 0)', transform: 'skewX(1.5deg)' },
          '22%':       { clipPath: 'inset(100% 0 0 0)', transform: 'skewX(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        scanline: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'glitch-1': 'glitch1 4s infinite linear',
        'glitch-2': 'glitch2 4s infinite linear',
        'float':    'float 6s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
      },
    },
  },
  plugins: [],
};
