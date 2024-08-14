import animation from './styles/tailwind.animation';
import colors from './styles/tailwind.colors';
import keyframes from './styles/tailwind.keyframes';
import screens from './styles/tailwind.screens';
import boxShadow from './styles/tailwind.shadow';
import typography from './styles/tailwind.typography';

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors,
      screens,
      boxShadow,
      animation,
      keyframes,
      ...typography,
    },
  },
  plugins: [],
};

export default config;
