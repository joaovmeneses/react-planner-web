const { purple } = require('@mui/material/colors');

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
          text: '#5e5873',
          gradient: {
            min: '#DF2BFF',
            med: '#B91EFF',
            max: '#8304FF'
          },
        },
        dark: {
          DEFAULT: '#283046',
          text: '#d0d2d6',
          gradient: {
            min: '#4E4E4E',
            med: '#3C3C3C',
            max: '#1E1E1E'
          },
        }
      }
    }
  },
  variants: {
    extend: {}
  }
}
