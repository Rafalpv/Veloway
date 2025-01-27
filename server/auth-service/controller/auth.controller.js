import { validationResult } from 'express-validator'
import { validateUserCredentials, setAuthToken } from '../utils/functions.js'

const userLogin = async (req, res) => {
  const { nickname, password } = req.body

  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() })
  }

  try {
    const userData = await validateUserCredentials(nickname, password)

    setAuthToken(res, userData)

    res
      .status(200)
      .json({ message: 'User login successful' })
  } catch (error) {
    // Manejo de errores
    if (error.message.includes('Invalid credentials')) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    console.error(error)
    res.status(500).json({ message: 'Error during login process' })
  }
}

export default { userLogin }
