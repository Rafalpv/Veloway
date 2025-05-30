/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{html,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Tema claros
        'background-light': '#F4F4F2',
        'surface-light': '#FFFFFF',
        'text-light': '#1C1C1C',
        'primary-light': '#2D6A4F',
        'secondary-light': '#0077B6',
        'accent-light': '#FFB703',
        'button-light': '#8AC926',
        'danger-light': '#E63946',
        'theme-light': '#94A3B8',

        // Tema oscuros
        'background-dark': '#271E27',
        'surface-dark': '#1E1E1E',
        'text-dark': '#E5E5E5',
        'primary-dark': '#90EC6F',
        'secondary-dark': '#BB98F2',
        'accent-dark': '#FFC107',
        'button-dark': '#3F51B5',
        'danger-dark': '#F94144',
        'theme-dark': '#334155',

        // Colores personalizados
        'background-blue': '#4270BE'
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
        boton: '3px 4px 4px 1px rgba(61,61,61,0.82)'
      }
    }
  },
  plugins: []
}
