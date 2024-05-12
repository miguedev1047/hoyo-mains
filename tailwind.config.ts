import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './render/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'color-gray': '#C4C6CF',
        'color-red': '#A52834',
        'color-white': '#FFFFFF',
        'color-gold': '#D7B580',
        'color-black': '#050613',

        'color-dark': '#2C2937',
        'color-light': '#F5F5F5',

        'primary-color': '#534A5D',
        'secondary-color': '#668CF6'
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        'app-theme': {
          extend: 'dark',
          colors: {
            background: '#050613',
            foreground: '#FFFFFF'
          }
        }
      }
    })
  ]
}
