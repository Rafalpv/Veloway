import React from 'react'
import useForm from '../components/useForm'

const SignUp = () => {
  const [formValues, handleInputChange] = useForm({
    nombreUsuario: '',
    email: '',
    password: '',
    apellido: '',
    privacidad: '',
    dificultad: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log(formValues)
  }

  return (
    <div className="signup-container">
      <h2>Creación de usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombreUsuario">Nombre de usuario</label>
          <input
            type="text"
            id="nombreUsuario"
            name="nombreUsuario"
            required
            autoFocus
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="privacidad">Privacidad</label>
          <input
            type="radio"
            name="privacidad"
            value="publica"
            required
            onChange={handleInputChange}
          />
          Tu perfil será visible para todos los usuarios
          <input
            type="radio"
            name="privacidad"
            value="amigos"
            required
            onChange={handleInputChange}
          />
          Tu perfil será visible para todos los amigos
          <input
            type="radio"
            name="privacidad"
            value="privada"
            required
            onChange={handleInputChange}
          />
          Tu perfil no será visible para nadie
        </div>
        <div className="form-group">
          <label htmlFor="dificultad">Dificultad</label>
          <input
            type="radio"
            name="dificultad"
            value="baja"
            required
            onChange={handleInputChange}
          />
          Dificultad baja
          <input
            type="radio"
            name="dificultad"
            value="media"
            required
            onChange={handleInputChange}
          />
          Dificultad media
          <input
            type="radio"
            name="dificultad"
            value="alta"
            required
            onChange={handleInputChange}
          />
          Dificultad alta
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default SignUp
