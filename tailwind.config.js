/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-navy': '#000d20',
      },
      fontFamily: {
        'zen-dots': ['Zen Dots', 'cursive'],
      },
    },
  },
  plugins: [],
};
