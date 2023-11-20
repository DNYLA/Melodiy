import { mauve, violet } from '@radix-ui/colors';
import type { Config } from 'tailwindcss';

// bg-teal-600

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#319795', // bg-teal-600 (Better colour?)
        // primary: '#ec3454',
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
        ...mauve,
        ...violet,
      },
    },
  },
  plugins: [],
};
export default config;
