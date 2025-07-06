import express from 'express'
import actRoutes from './routes/act.route.js'
import dotenv from 'dotenv'
dotenv.config({ path: './act-service/.env' })

const app = express()
app.use(express.json({ limit: '10mb' }))

app.use('/', actRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Microservicio de usuarios corriendo en http://localhost:${process.env.PORT}`)
})
