import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT)
    req.user = {
      id_user: decoded.id_user,
      nickname: decoded.nickname,
      role: decoded.role
    }
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' })
  }
}

export default verifyToken
