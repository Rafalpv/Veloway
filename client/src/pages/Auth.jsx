import { useState } from 'react'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'

const Auth = () => {
  const [isLoginPage, setIsLoginPage] = useState(true)

  const handleToggle = () => {
    setIsLoginPage(!isLoginPage)
  }

  return (
    <main className="grid grid-cols-5 bg-background-light h-screen">
      {/* Imagen de fondo */}
      <div
        className={`relative grid place-items-center col-span-3 column image-column ${isLoginPage ? 'order-2 -right-full' : 'order-1'}`}
      >
        <div
          className={`w-[85%] h-[90%] shadow-image-der flex items-center justify-center bg-cover bg-center bg-[url('/img/ciclista-fondo.jpg')] ${isLoginPage ? 'shadow-image-der' : 'shadow-image-izq'}`}
        >
          <h1 className="font-sixcaps text-gold text-[20vw] tracking-widest leading-none text-center select-none">
            Velo<br />way
          </h1>
        </div>
      </div>

      {/* Columna de los formularios */}
      <div
        className={`bg-blue col-span-2 shadow-image font-poppins text-white flex flex-col items-center justify-center column form-column ${isLoginPage ? 'order-1 rounded-r-2xl shadow-image-der' : 'order-2 rounded-l-2xl shadow-image-izq'}`}
      >
        {
          isLoginPage
            ? <LoginForm handleToggle={handleToggle} />
            : <SignupForm handleToggle={handleToggle} />
        }
      </div>
    </main>
  )
}

export default Auth
