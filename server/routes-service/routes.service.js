import express from 'express'
import connectDB from './config/database.js'
import dotenv from 'dotenv'
dotenv.config({ path: './routes-service/.env' })

connectDB()

const app = express()

app.use(express.json({ limit: '10mb' }))
app.get('/', (req, res) => {
  res.send('🚀 Veloway API - Servicio de Rutas')
})

app.listen(process.env.PORT, () => {
  console.log(`Routes service running on http://localhost:${process.env.PORT}`)
})
