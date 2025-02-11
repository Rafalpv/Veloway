import express from 'express'
import usersRoutes from './routes/users.routes.js'
import dotenv from 'dotenv'
dotenv.config({ path: './users-service/.env' })

const app = express()
app.use(express.json({ limit: '10mb' }))

app.use('/', usersRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Microservicio de usuarios corriendo en http://localhost:${process.env.PORT}`)
})
