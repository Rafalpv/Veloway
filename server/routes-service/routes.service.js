import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json({ limit: '10mb' }))
app.use('/', (req, res) => {
  res.send('Hello from routes service')
})

app.listen(process.env.PORT, () => {
  console.log(`Routes service running on http://localhost:${process.env.PORT}`)
})
