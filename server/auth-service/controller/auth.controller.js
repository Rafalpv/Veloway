import axios from 'axios'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path: './auth-service/.env' })

const userLogin = async (req, res) => {
  const { nickname, password } = req.body

  try {
    // Llama al servicio de usuarios para validar las credenciales
    const userResponse = await axios.post('http://localhost:4000/validate', {
      nickname,
      password
    })

    const userData = userResponse.data

    // Generar un token JWT para el usuario
    const token = jwt.sign(
      { id: userData.id, nickname: userData.nickname },
      process.env.SECRET_JWT,
      { expiresIn: '1h' }
    )

    const cookies = {
      httOnly: true,
      sameSite: true,
      maxAge: 60 * 60 * 1000
    }

    res
      .cookie('authToken', token, cookies)
      .status(200)
      .json({ message: 'User login successful', token })
  } catch (error) {
    if (error.response) {
      // Maneja errores provenientes de los servicios
      res
        .status(error.response.status)
        .json({ error: error.response.data.error })
    } else {
      console.error(error)
      res.status(500).json({ message: 'Error during login process' })
    }
  }
}

export default { userLogin }
