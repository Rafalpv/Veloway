import useForm from '../hooks/useForm'
import { useNavigate } from 'react-router'
import axiosInstance from '../api/axiosInstance'

const LoginForm = ({ handleToggle }) => {
  const [formValues, handleInputChange] = useForm({
    nickname: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.post('/auth/login', formValues)
      navigate('/profile')
    } catch (err) {
      console.error('Error al iniciar sesión:', err)
      console.error('Detalles del error:', err.response?.data || err.message)
    }
  }

  return (
    <>
      <p className='absolute top-3 left-3 text-m '>
        ¿Aún no tienes cuenta? &nbsp;
        <button className='text-gold font-bold underline' onClick={handleToggle}> Registrarse </button>
      </p>
      <form onSubmit={handleSubmit} className='flex flex-col items-center h-auto space-y-24 w-[480px]'>
        <div className='form__group'>
          <input
            className='form__field'
            name='nickname'
            type='text'
            autoFocus
            onChange={handleInputChange}
            required
            pattern='^[a-zA-Z0-9]{5,20}$'
            autoComplete='off'
            placeholder=''
          />
          <label className='form__label' htmlFor='nickname'>Nombre de Usuario</label>
        </div>
        <div className='form__group'>
          <input
            className='form__field'
            name='password'
            type='password'
            onChange={handleInputChange}
            required
            pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$'
            placeholder=''
            autoComplete='off'
          />
          <label htmlFor='password' className='form__label'>Contraseña</label>
        </div>
        <button className='text-white font-bold text-xl bg-gold-dark rounded-2xl shadow-boton p-3 w-[70%]' type='submit'>Acceder</button>
      </form>
    </>
  )
}

export default LoginForm
