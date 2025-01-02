import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
  }
  return (
    <div className="login-container">
      <h2>Creacion de usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            autoFocus
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombre">Apellido:</label>
          <input
            type="text"
            id="nombre"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombre">Nombre de usuario:</label>

          <input
            type="text"
            id="nombre"
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='foto_perfil'>Foto de Perfil:</label>
          <input
            type="text"
            id="nombre"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="privacidad">Privacidad</label>
          <input type="radio" name="privacidad" value="publica" required />
          Tu perfil será visible para todos los usuarios
          <input type="radio" name="privacidad" value="amigos" required />
          Tu perfil será visible para todos los amigos
          <input type="radio" name="privacidad" value="privada" required />
          Tu perfil no será visible para nadie
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Login
