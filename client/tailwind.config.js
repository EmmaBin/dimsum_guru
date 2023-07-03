/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      display: ["group-hover"],
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}