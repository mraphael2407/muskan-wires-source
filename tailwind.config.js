/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forge: '#1C1C1E',
        steel: {
          DEFAULT: '#4A4E54',
          light: '#6B7280',
        },
        galvanized: '#9EA3AA',
        rust: {
          DEFAULT: '#C94E1A',
          light: '#E56B3A',
          dark: '#A33D14',
        },
      },
      fontFamily: {
        barlow: ['Barlow', 'sans-serif'],
        'barlow-condensed': ['Barlow Condensed', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
    },
  },
  plugins: [],
};
