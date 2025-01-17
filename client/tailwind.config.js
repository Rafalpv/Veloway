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
      backgroundImage: {
        'custom-gradient': 'linear-gradient(0deg, rgba(67,111,85,1) 0%, rgba(73,135,62,1) 50%, rgba(32,84,53,1) 100%)'
      },
      fontFamily: {
        sixcaps: ['Six Caps', 'mono'],
        montserrat: ['Montserrat', 'mono']
      },
      boxShadow: {
        image: '10px 10px 7px 3px rgba(41,41,41,0.92)',
        boton: '10px 10px 7px 3px rgba(21,21,21,0.92)'
      }
    }
  },
  plugins: []
}
