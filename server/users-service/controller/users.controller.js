import { where } from 'sequelize'
import Users from '../models/Users.js'
import bcrypt from 'bcrypt'

// POST
// http://localhost:3000/users/signup/new -> http://localhost:4000/signup/new
const newUser = async (req, res) => {
  const { nickname, email, photo, password, level } = req.body

  try {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const user = await Users.create({
      nickname,
      email,
      password: hashedPassword,
      photo,
      level
    })

    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      user
    })
  } catch (error) {
    console.error('Error creating user:', error)

    // Responder con error
    res.status(500).json({
      status: 'error',
      message: 'Error creating user',
      error: error.message
    })
  }
}

// GET
// http://localhost:3000/users
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
// http://localhost:3000/users/nickname
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
// http:localhost:3000/users/validate
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

export default {
  newUser,
  listUsers,
  getUserByNickname,
  validetaUser
}
