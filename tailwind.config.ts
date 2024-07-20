import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './render/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      xs: '480px',
      xls: '425px'
    },
    extend: {
      colors: {
        'color-gray': '#C4C6CF',
        'color-red': '#F62F63',
        'color-gold': '#D7B580',
        'color-darkest': '#100e2a',
        'color-dark': '#241f56',
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
