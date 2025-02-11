import express from 'express'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'
import dotenv from 'dotenv'
dotenv.config({ path: './auth-service/.env' })

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/', authRouter)

app.listen(process.env.PORT, () => {
  console.log(`Microservicio de usuarios corriendo en http://localhost:${process.env.PORT}`)
})
