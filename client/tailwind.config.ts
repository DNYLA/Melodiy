import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ec3454',
        inactive: '#a3a3a3',
        sidebar: {
          // background: '#131111',
          background: '#000',
        },
        base: {
          text: '',
          active: '',
          background: '#131111',
        },
      },
    },
  },
  plugins: [],
};
export default config;
