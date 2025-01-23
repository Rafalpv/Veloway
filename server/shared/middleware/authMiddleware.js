import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT)
    req.user = decoded // Agregar datos del usuario al objeto req
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' })
  }
}

export default authMiddleware
