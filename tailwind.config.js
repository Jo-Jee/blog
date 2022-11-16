/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'code::after': false,
            'code::before': false
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
