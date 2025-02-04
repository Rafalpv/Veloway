/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'background-light': '#ECE8E8',
        'backgraound-admin': '#D6DBE0',
        green: '#205435',
        blue: '#3F51B5',
        gold: '#FFC107',
        'gold-dark': '#FFA000'

      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(0deg, rgba(67,111,85,1) 0%, rgba(73,135,62,1) 50%, rgba(32,84,53,1) 100%)'
      },
      fontFamily: {
        sixcaps: ['Six Caps', 'mono'],
        poppins: ['Poppins', 'mono']
      },
      boxShadow: {
        'image-der': '7px 3px 3px 3px rgba(45,45,45,0.92)',
        'image-izq': '-7px 3px 3px 3px rgba(25,25,25,0.92)',
        boton: '5px 6px 1px 2px rgba(31,31,21,0.92)'
      }
    }
  },
  plugins: []
}
