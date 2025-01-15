import React from 'react'
import useForm from '../components/useForm'
import axiosInstance from '../utils/axiosInstance'

const SignUp = () => {
  const [formValues, handleInputChange] = useForm({
    nickname: '',
    email: '',
    photo: '',
    password: '',
    level: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      axiosInstance.post('/users/new', formValues)
    } catch (error) {
      console.log('Error al crear un nuevo usuario')
    }
  }

  return (
    <main className="grid grid-cols-5 bg-background-light h-screen">
      {/* Imagen de fondo */}
      <div className="relative grid place-items-center col-span-3">
        <div
          className="w-[80%] h-[90%]  shadow-3xl flex items-center justify-center bg-cover bg-center bg-[url('/img/ciclista-fondo.jpg')]"
        >
          <h1 className='font-sixcaps text-gold text-[20vw] tracking-widest leading-none text-center select-none'>
            Velo<br />way
          </h1>
        </div>
      </div>
      {/* Formulario de registro */}
      <div className='bg-green opacity-90 col-span-2 font-montserrat text-white flex flex-col items-center justify-center relative'>
        <p className='absolute top-3 right-3 text-sm'>
          ¿Ya tienes cuenta? &nbsp;
          <button className='text-gold font-bold'>Inicio de Sesión</button>
        </p>
        <form onSubmit={handleSubmit} className='flex flex-col items-center h-auto space-y-14 w-full'>
          <div className='form__group'>
            <input
              type="text"
              id="nickname"
              name="nickname"
              required
              autoFocus
              onChange={handleInputChange}
              pattern="^[a-zA-Z0-9]{5,20}$"
              className='form__field'
              placeholder=''
            />
            <label
              htmlFor="nickname"
              className='form__label'
            >
              Nombre de Usuario
            </label>
          </div>
          <div className='form__group'>
            <input
              type="email"
              id="email"
              name="email"
              className='form__field'
              required
              pattern="^.{10,}$"
              placeholder=''
              onChange={handleInputChange}
            />
            <label
              htmlFor="email"
              className='form__label'
            >
              Email
            </label>
          </div>
          <div className='form__group'>
            <input
              type="password"
              id="password"
              name="password"
              className='form__field'
              required
              placeholder=''
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$"
              onChange={handleInputChange}
            />
            <label
              htmlFor="password"
              className='form__label'
            >
              Contraseña
            </label>
          </div>
          <div className='space-y-3'>
            <label
              htmlFor="level"
              className='text-3xl font-bold'
            >
              Nivel
            </label>
            <div className='space-y-3'>
              <div>
                <label className='level__label'>
                  <input
                    className='level__input'
                    type="radio"
                    name="level"
                    value="beginner"
                    required
                    onChange={handleInputChange}
                  />
                  Dificultad baja
                </label>
                <p className='explicacion__nivel'>Soy principiante y prefiero rutas cortas, sencillas y de baja dificultad.</p>
              </div>
              <div>
                <label className='level__label'>
                  <input
                    className='level__input'
                    type="radio"
                    name="level"
                    value="intermediate"
                    required
                    onChange={handleInputChange}
                  />
                  Dificultad media
                </label>
                <p className='explicacion__nivel'>Tengo experiencia moderada y me siento cómodo con rutas de mayor duración y dificultad media.</p>
              </div>
              <div>
                <label className='level__label'>
                  <input
                    className='level__input'
                    type="radio"
                    name="level"
                    value="advanced"
                    required
                    onChange={handleInputChange}
                  />
                  Dificultad alta
                </label>
                <p className='explicacion__nivel'>Soy un ciclista experimentado, disfruto de rutas largas y desafiantes con terrenos variados.</p>
              </div>
            </div>
          </div>
          <button
            className='text-white font-bold text-xl bg-gold-dark rounded-2xl shadow-3xl p-3 w-1/2'
            type="submit">
            Registrar
          </button>
        </form>
      </div>

    </main>
  )
}

export default SignUp
