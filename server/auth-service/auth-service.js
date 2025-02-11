import express from 'express'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cookieParser())

app.use('/', authRouter)

app.listen(PORT, () => {
  console.log(`Microservicio de usuarios corriendo en http://localhost:${PORT}`)
})
