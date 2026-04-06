/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          brandRed: '#C41E3A',
          forestGreen: '#1B3022',
          onyx: '#0F0F0F',
        },
        fontFamily: {
          heading: ['Inter', 'sans-serif'],
          body: ['Montserrat', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }