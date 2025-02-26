import toast from 'react-hot-toast'
import axiosInstance from '@api/axiosInstance'
import useForm from '@auth/hooks/useForm'

const SignupForm = ({ handleToggle }) => {
  const [formValues, handleInputChange] = useForm({
    nickname: '',
    email: '',
    photo: '',
    password: '',
    level: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Enviamos los datos al endpoint de registro
      await axiosInstance.post('/users/new', formValues)

      // Notificación de éxito
      toast.success('Usuario creado con éxito', {
        duration: 5000,
        position: 'top-left'
      })
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error al crear el usuario'

      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-left'
      })
    }
  }

  return (
    <>
      <p className='absolute top-3 right-3 text-m'>
        ¿Ya tienes cuenta? &nbsp;
        <button className='text-gold font-bold underline' onClick={handleToggle}>Inicio de Sesión</button>
      </p>
      <form onSubmit={handleSubmit} className='flex flex-col items-center h-auto space-y-14 w-[480px]'>
        <div className='form__group'>
          <input
            type='text'
            name='nickname'
            required
            autoFocus
            onChange={handleInputChange}
            pattern='^[a-zA-Z0-9]{5,20}$'
            className='form__field'
            placeholder=''
            autoComplete='off'
          />
          <label
            htmlFor='nickname'
            className='form__label'
          >
            Nombre de Usuario
          </label>
        </div>
        <div className='form__group'>
          <input
            type='email'
            name='email'
            className='form__field'
            required
            pattern='^.{10,}$'
            onChange={handleInputChange}
            placeholder=''
            autoComplete='off'
          />
          <label
            htmlFor='email'
            className='form__label'
          >
            Email
          </label>
        </div>
        <div className='form__group'>
          <input
            type='password'
            name='password'
            className='form__field'
            required
            pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$'
            onChange={handleInputChange}
            placeholder=''
          />
          <label
            htmlFor='password'
            className='form__label'
          >
            Contraseña
          </label>
        </div>
        <div className='space-y-3'>
          <label
            htmlFor='level'
            className='text-3xl font-bold'
          >
            Nivel
          </label>
          <div className='space-y-3'>
            <div>
              <label className='level__label'>
                <input
                  className='level__input'
                  type='radio'
                  name='level'
                  value='beginner'
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
                  type='radio'
                  name='level'
                  value='intermediate'
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
                  type='radio'
                  name='level'
                  value='advanced'
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
          className='text-white font-bold text-xl bg-gold-dark rounded-2xl shadow-boton p-3 w-[70%]'
          type='submit'>
          Registrar
        </button>
      </form>
    </>
  )
}

export default SignupForm
