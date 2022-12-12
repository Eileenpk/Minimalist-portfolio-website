/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': "500px",
        'sm': '650px',
        'md': '750px',
      },
    },
    colors: {
      'main-color': '#fafafa',
      'btn-color': '#203a4c',
      'btn-second-color': '#1d3444',
      'heading-color': '#33323d',
      'font-color': '#5b5a63',
      'light-font-color': '96969c',
      'border-color': '#dcdcde',
      'hover-color':'#5FB4A2',
      'form-input-color': '#e6e6e7',
      'error-color': '#F43030'
    },
    fontFamily: {
      text: ['Public Sans', 'sans-serif'],
      header: ['Ibarra Real Nova', 'serif'],
    },
  },
  plugins: [],
}