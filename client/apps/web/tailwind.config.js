/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary: '#319795',
        secondary: '#4adad7',
        accent: '#111111',
        inactive: '#a3a3a3',
        base: '#222222',
        'base-accent': '#898989',
        content: '#e0e0e0',
        background: '#060606',
        modal: '#202020',
      },
      animation: {
        fade: 'fadeIn .5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
