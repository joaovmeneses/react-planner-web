/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  corePlugins: {
    preflight: false
  },
  important: '#__next',
  plugins: [require('tailwindcss-logical'), require('./src/@core/tailwind/plugin')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          DEFAULT: '#f8f8f8',
          text: '#5e5873'
        },
        dark: {
          DEFAULT: '#283046',
          text: '#d0d2d6'
        }
      }
    }
  },
  variants: {
    extend: {}
  }
}
