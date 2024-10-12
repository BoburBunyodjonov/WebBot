/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      scrollbar: {
        'hidden': {
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',  
          'scrollbar-width': 'none',  
        },
      },
    },
  },
  plugins: [],
}