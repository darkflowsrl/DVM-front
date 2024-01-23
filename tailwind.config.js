/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      roboto: ['Roboto Flex', 'sans-serif']
    },
    backgroundPosition: {
      'right-24': 'right 24px'
    },
    extend: {}
  },
  plugins: []
}
