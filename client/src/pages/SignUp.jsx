import React, { useState } from 'react'

const SignUp = () => {
  const [nombreUsuario, setNombreUsuario] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [apellido, setApellido] = useState('')
  const [fotoPerfil, setFotoPerfil] = useState('')
  const [privacidad, setPrivacidad] = useState('')
  const [dificultad, setDificultad] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log({
      nombreUsuario,
      email,
      password,
      apellido,
      fotoPerfil,
      privacidad,
      dificultad
    })
  }

  return (
    <div className="signup-container">
      <h2>Creacion de usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombreUsuario">Nombre de usuario</label>
          <input
            type="text"
            id="nombreUsuario"
            required
            autoFocus
            onChange={(e) => setNombreUsuario(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            required
            onChange={(e) => setNombreUsuario(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            required
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="privacidad">Privacidad</label>
          <input type="radio" name="privacidad" value="publica" required onChange={(e) => setPrivacidad(e.target.value)} />
          Tu perfil será visible para todos los usuarios
          <input type="radio" name="privacidad" value="amigos" required onChange={(e) => setPrivacidad(e.target.value)} />
          Tu perfil será visible para todos los amigos
          <input type="radio" name="privacidad" value="privada" required onChange={(e) => setPrivacidad(e.target.value)} />
          Tu perfil no será visible para nadie
        </div>
        <div className="form-group">
          <label htmlFor="dificultad">Dificultad</label>
          <input type="radio" name="dificultad" value="baja" required onChange={(e) => setDificultad(e.target.value)} />
          Dificultad baja
          <input type="radio" name="dificultad" value="media" required onChange={(e) => setDificultad(e.target.value)} />
          Dicultada media
          <input type="radio" name="dificultad" value="alta" required onChange={(e) => setDificultad(e.target.value)} />
          Dificultad alta
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default SignUp
