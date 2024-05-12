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
        'color-red': '#F62F63',
        'color-gold': '#D7B580',
        'color-darkest': '#070616',
        'color-dark': '#171435',
        'color-light': '#D6D4E8',
        'color-lightest': '#FFFFFF',
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
            background: '#070616',
            foreground: '#D6D4E8'
          }
        }
      }
    })
  ]
}
