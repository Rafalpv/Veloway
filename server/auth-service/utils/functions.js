import axios from 'axios'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({ path: './auth-service/.env' })

export const validateUserCredentials = async (nickname, password) => {
  try {
    const response = await axios.post('http://localhost:3000/users/validate', {
      nickname,
      password
    })
    return response.data.user
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Validation failed')
  }
}

export const setAuthToken = (res, userData) => {
  const token = jwt.sign(
    { id_user: userData.id_user, nickname: userData.nickname, role: userData.role },
    process.env.SECRET_JWT,
    { expiresIn: '15m' }
  )

  const cookies = {
    httpOnly: true,
    sameSite: 'Strict',
    secure: false,
    maxAge: 60 * 60 * 1000
  }

  res.cookie('authToken', token, cookies)
  return token
}

export default { validateUserCredentials, setAuthToken }
