/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 2s linear infinite', // Define una animación de giro lento
      },
      colors: {
        "dark-blue": "#023047",
        "secondary-text":"#BABABA",
        "pink" : "#F9546B",
        "light-pink-text": "#FFC2C6",
        "orange":"#FC7551"
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(249, 84, 107, 1)',
        'form': '-12px 12px 11px 0px rgba(207,70,89,0.4)'
      },
      fontFamily: {
        Poppins:["Poppins", "sans-serif"],
        Comfortaa:["Comfortaa", "sans-serif"]
      },
    },
  },
  plugins: [],
}

