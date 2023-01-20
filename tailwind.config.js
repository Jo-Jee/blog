/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        invert: {
          css: {
            code: {
              background: theme('colors.stone.500')
            },
            pre: {
              background: theme('colors.black'),
              code: {
                background: 'inherit'
              }
            },
            '--tw-prose-hr': theme('colors.stone.500'),
            '--tw-prose-invert-bullets': theme('colors.stone.300')
          }
        },
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
          }
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
