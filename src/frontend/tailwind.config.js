const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    content: ["src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
              },
        },
        screens: {
            'xs': '475px',
            ...defaultTheme.screens,
        },
    },

    safelist: [
        {
            pattern: /^bg-/
        },
        {
            pattern: /^text-/
        },
        {
            pattern: /^border-/
        },
        {
            pattern: /^basis-/
        },
        {
            pattern: /^m-/
        },
        {
            pattern: /^p-/
        }
    ],

    variants: {
        extend: {},
    }
}