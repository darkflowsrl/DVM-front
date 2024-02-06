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
    extend: {
      backgroundColor: {
        default: '#D9D9D9',
        success: '#32CF9C',
        warning: '#FFC107',
        error: '#DC3545',
        box: '#1C2E3D'
      },
      textColor: {
        default: '#D9D9D9',
        success: '#32CF9C',
        warning: '#FFC107',
        error: '#DC3545'
      },
      borderColor: {
        default: '#D9D9D9',
        success: '#32CF9C',
        warning: '#FFC107',
        error: '#DC3545'
      }
    }
  },
  plugins: []
}
