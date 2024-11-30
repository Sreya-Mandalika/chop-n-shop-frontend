/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        spotifyGreen: '#1DB954',
        spotifyBlack: '#191414',
        spotifyGray: '#b3b3b3',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
  corePlugins: {
    preflight: true,
  },
}