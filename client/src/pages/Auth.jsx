import { useState } from 'react'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'

const Auth = () => {
  const [isLoginPage, setIsLoginPage] = useState(true)

  const handleToggle = () => {
    setIsLoginPage(!isLoginPage)
  }

  return (
    <main className='grid grid-cols-5 bg-background-light h-screen'>
      {/* Imagen de fondo */}
      <div className={`relative grid place-items-center col-span-3 ${isLoginPage ? 'order-2' : 'order-1'}`}>
        <div
          className="w-[90%] h-[90%]  shadow-image flex items-center justify-center bg-cover bg-center bg-[url('/img/ciclista-fondo.jpg')]"
        >
          <h1 className='font-sixcaps text-gold text-[20vw] tracking-widest leading-none text-center select-none'>
            Velo<br />way
          </h1>
        </div>
      </div>
      <div className={`bg-green opacity-90 col-span-2 font-montserrat text-white flex flex-col items-center justify-center ${isLoginPage ? 'order-1' : 'order-2'}`}>
        {/* Formulario de Signup/Login */}
        {!isLoginPage
          ? <SignupForm handleToggle={handleToggle} />
          : <LoginForm handleToggle={handleToggle} />}
      </div>
    </main >
  )
}

export default Auth
