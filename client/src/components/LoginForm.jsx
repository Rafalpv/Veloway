import useForm from '../hooks/useForm'

const LoginForm = ({ handleToggle }) => {
  const [formValues, handleInputChange] = useForm({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    console.log(formValues)
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
            type="email"
            autoFocus
            onChange={handleInputChange}
            required
            placeholder=''
          />
          <label className='form__label' htmlFor="email">Nombre de Usuario</label>
        </div>
        <div className="form__group">
          <input
            className='form__field'
            type='password'
            onChange={handleInputChange}
            required
            placeholder=''
          />
          <label htmlFor="password" className='form__label'>Contraseña</label>
        </div>
        <button className='text-white font-bold text-xl bg-gold-dark rounded-2xl shadow-boton p-3 w-full' type='submit'>Acceder</button>
      </form>
    </>
  )
}

export default LoginForm
