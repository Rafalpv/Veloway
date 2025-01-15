/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'background-light': '#ECE8E8',
        green: '#205435',
        gold: '#FFC107',
        'gold-dark': '#FFA000'

      },
      fontFamily: {
        sixcaps: ['Six Caps', 'mono'],
        montserrat: ['Montserrat', 'mono']
      },
      boxShadow: {
        '3xl': '10px 10px 7px 3px rgba(51,51,51,0.92)'
      }
    }
  },
  plugins: []
}
