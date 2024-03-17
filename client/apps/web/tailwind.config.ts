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
        // primary: '#ec3454' //Good Pink Colour (Set Primary-light to same value if you like this pink)
        primary: '#319795', // bg-teal-600 (Better colour?)
        //You should keep primary & primary light the same however in the case of using this teal colour
        //the highlight colour when a track is currently playing/selected looks dim.
        'primary-light': '#4adad7',
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
