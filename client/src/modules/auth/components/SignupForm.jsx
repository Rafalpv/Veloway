import NewUserForm from './NewUserForm'

const SignupForm = ({ handleToggle }) => {
  return (
    <>
      <p className='absolute top-3 right-3 text-m'>
        ¿Ya tienes cuenta? &nbsp;
        <button className='text-gold font-bold underline' onClick={handleToggle}>Inicio de Sesión</button>
      </p>
      <NewUserForm />
    </>
  )
}

export default SignupForm
