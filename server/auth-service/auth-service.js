import express from 'express'

const app = express()
const PORT = 5000

app.use(express.json())

app.use('/', (req, res) => {
  return res.json({
    message: 'Hola desde el microservicio de autenticación'
  })
})

app.listen(PORT, () => {
  console.log(`Microservicio de usuarios corriendo en http://localhost:${PORT}`)
})
