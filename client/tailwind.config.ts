import { mauve, violet } from '@radix-ui/colors';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
        ...mauve,
        ...violet,
      },
    },
  },
  plugins: [],
};
export default config;
