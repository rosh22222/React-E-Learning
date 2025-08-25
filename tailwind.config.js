/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
};
