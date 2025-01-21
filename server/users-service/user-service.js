import express from 'express'
import usersRoutes from './routes/users.routes.js'
import cors from 'cors'

const app = express()
app.use(express.json({ limit: '10mb' }))
const PORT = 4000

app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}))

app.use('/', usersRoutes)

app.listen(PORT, () => {
  console.log(`Microservicio de usuarios corriendo en http://localhost:${PORT}`)
})
