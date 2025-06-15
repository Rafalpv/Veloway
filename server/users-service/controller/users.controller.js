import { Op } from 'sequelize'
import Users from '../models/Users.js'
import FavRoutes from '../models/FavRoutes.js'
import bcrypt from 'bcrypt'
import axios from 'axios'

// POST
// http://localhost:3000/users/signup/new -> http://localhost:4000/signup/new
const newUser = async (req, res) => {
  const { nickname, email, password, level, photo, role } = req.body

  try {
    const existingUser = await Users.findOne({
      where: {
        [Op.or]: [{ nickname }, { email }]
      }
    })

    if (existingUser) {
      const message = existingUser.nickname === nickname
        ? 'El nickname ya está registrado.'
        : 'El correo ya está registrado.'
      return res.status(409).json({
        status: 'error',
        message
      })
    }

    // Hashear la contraseña
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Crear el usuario
    const user = await Users.create({
      nickname,
      email,
      password: hashedPassword,
      photo,
      level,
      role
    })

    res.status(201).json({
      status: 'success',
      message: 'Usuario creado exitosamente',
      user: {
        id: user.id,
        nickname: user.nickname,
        email: user.email,
        level: user.level,
        createdAt: user.createdAt
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al registrar el usuario'
    })
  }
}

// GET
// http://localhost:3000/users -> http://localhost:4000/
const listUsers = async (req, res) => {
  try {
    const users = await Users.findAll()
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error listing users' })
  }
}

// GET
// http://localhost:3000/users/nickname -> http://localhost:4000/nickname
const getUserByNickname = async (req, res) => {
  try {
    const { nickname } = req.params
    const user = await Users.findOne({
      where: { nickname }
    })
    if (!user) {
      return res.status(404).json({ error: 'User not find' })
    }
    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error listing users' })
  }
}

// POST
// http:localhost:3000/users/validate -> http://localhost:4000/validate
const validetaUser = async (req, res) => {
  const { nickname, password } = req.body

  try {
    const user = await Users.findOne({
      where: { nickname }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not find' })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' })
    }
    res.status(200).json({ user: user.dataValues, message: 'User validated successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error validating user' })
  }
}

// DELETE
// http:localhost:3000/user/{nickname} -> http://localhost:4000/{nickname}
const deleteUser = ('/user/:nickname', async (req, res) => {
  const { nickname } = req.params

  try {
    const resultado = await Users.destroy({ where: { nickname } })

    if (resultado === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' })
    }

    return res.status(200).json({ mensaje: 'Usuario eliminado correctamente' })
  } catch (error) {
    console.error('Error en el backend:', error)
    return res.status(500).json({ mensaje: 'Error eliminando usuario' })
  }
})

// FAV ROUTES ADD
// http://localhost:3000/users/favRoutes -> http://localhost:4000/favRoutes
const addFavRoute = async (req, res) => {
  const { idUser, idRoute } = req.body

  try {
    const [favRoute, created] = await FavRoutes.findOrCreate({
      where: { idUser, idRoute }
    })

    if (!created) {
      return res.status(409).json({ message: 'Ruta ya añadida en favoritos' })
    }

    res.status(201).json(favRoute)
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir la ruta', error })
  }
}

// FAV ROUTES REMOVE
// http://localhost:3000/users/favRoutes/remove -> http://localhost:4000/favRoutes/remove
const removeFavouriteRoute = async (req, res) => {
  const { idUser, idRoute } = req.body

  try {
    const deleted = await FavRoutes.destroy({
      where: { idUser, idRoute }
    })

    if (!deleted) {
      return res.status(404).json({ message: 'No se encontró la ruta favorita' })
    }

    res.json({ message: 'Ruta favorita eliminada correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error eliminando ruta favorita', error })
  }
}

// FAV ROUTES BY USER
// http://localhost:3000/users/favRoutes/:idUser -> http://localhost:4000/favRoutes/:idUser
const getFavouriteRoutesByUser = async (req, res) => {
  const { idUser } = req.params
  try {
    const favRoutes = await FavRoutes.findAll({
      where: { idUser }
    })

    const routeIds = favRoutes.map(fav => fav.idRoute)

    if (routeIds.length === 0) {
      return res.status(200).json({ message: 'No se encontraron rutas favoritas para este usuario', routes: [] })
    }

    // Realiza varias peticiones individuales
    const response = await axios.post('http://localhost:3000/routes/multiple', {
      ids: routeIds // array de IDs
    })

    const routes = response.data.routes

    return res.status(200).json({ message: 'Rutas favoritas encontradas', routes })
  } catch (error) {
    console.error('Error obteniendo rutas favoritas', error)
    res.status(500).json({ message: 'Error obteniendo rutas favoritas', error: error.message })
  }
}

export default {
  newUser,
  listUsers,
  getUserByNickname,
  validetaUser,
  deleteUser,
  addFavRoute,
  removeFavouriteRoute,
  getFavouriteRoutesByUser
}
