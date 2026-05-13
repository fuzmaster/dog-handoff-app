import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/store/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#17201a',
        leaf: '#2f7d46',
        grass: '#eef8f0',
        bone: '#fffdf8',
        biscuit: '#f2d6a2'
      },
      boxShadow: {
        soft: '0 12px 30px rgba(23, 32, 26, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
