import User from '../models/Users.js'

// POST
// http://localhost:3000/users/new
const newUser = async(req, res) => {
  const { nickname, name, lastname, email, photo, password, privacy, level } = req.body

  try {
    await User.create({
      nickname,
      name,
      lastname,
      email,
      password,
      photo,
      privacy,
      level
    }).then(user => {
      res.status(201).json({
        status: 'succes',
        message: 'User created successfully',
        User: user
      })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creating user' })
  }
}

export default {
  newUser
}
