// const { mauve, violet } = require('@radix-ui/colors');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    '../../packages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // primary: '#ec3454' //Good Pink Colour (Set Primary-light to same value if you like this pink)
        primary: '#319795', // bg-teal-600 (Better colour?)
        // primary: '#ec3454',
        secondary: '#4adad7',
        accent: '#111111', //Currently not used this would be an alt colour
        // neutral: '', //Currently not used probably wont be used
        // info: '',
        // success: '',
        // warning: '',
        // error: '',
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
