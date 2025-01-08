import React from 'react'
import useForm from '../components/useForm'
import axiosInstance from '../utils/axiosInstance'

const SignUp = () => {
  const [formValues, handleInputChange] = useForm({
    nickname: '',
    name: '',
    lastname: '',
    email: '',
    photo: '',
    password: '',
    privacy: '',
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
    <div className="signup-container">
      <h2>Creación de usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nickname">Nombre de usuario</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            required
            autoFocus
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Apellido</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
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
            name="privacy"
            value="public"
            required
            onChange={handleInputChange}
          />
          Tu perfil será visible para todos los usuarios
          <input
            type="radio"
            name="privacy"
            value="friends"
            required
            onChange={handleInputChange}
          />
          Tu perfil será visible para todos los amigos
          <input
            type="radio"
            name="privacy"
            value="private"
            required
            onChange={handleInputChange}
          />
          Tu perfil no será visible para nadie
        </div>
        <div className="form-group">
          <label htmlFor="level">Dificultad</label>
          <input
            type="radio"
            name="level"
            value="beginner"
            required
            onChange={handleInputChange}
          />
          Dificultad baja
          <input
            type="radio"
            name="level"
            value="intermediate"
            required
            onChange={handleInputChange}
          />
          Dificultad media
          <input
            type="radio"
            name="level"
            value="advanced"
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
