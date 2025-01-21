import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}))

app.use('/', authRouter)

app.listen(PORT, () => {
  console.log(`Microservicio de usuarios corriendo en http://localhost:${PORT}`)
})
