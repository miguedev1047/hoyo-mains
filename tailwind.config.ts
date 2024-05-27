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
        'secondary-color': '#668CF6',
        'color-success': '#22C55E',
        'color-dark-hover': '#121026',
        'color-darkest-hover': '#08071a'
      },
      transitionTimingFunction: {
        'in-beizer': 'cubic-bezier(0.25, .4, 0.45, 1.4)'
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
            foreground: '#D6D4E8',
            default: '#534A5D'
          }
        }
      }
    })
  ]
}
