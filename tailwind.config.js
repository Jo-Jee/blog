/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            'code::after': false,
            'code::before': false,
            code: {
              'font-weight': 'normal',
              padding: 4,
              background: theme('colors.slate.200'),
              'border-radius': '0.25rem',
              margin: 3
            }
            // '--tw-prose-pre-code': theme('colors.black[300]')
          }
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
