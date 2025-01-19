import express from 'express'
import usersRoutes from './routes/users.routes.js'

const app = express()
const PORT = 4000

app.use(express.json())

app.use('/', usersRoutes)

app.listen(PORT, () => {
  console.log(`Microservicio de usuarios corriendo en http://localhost:${PORT}`)
})
