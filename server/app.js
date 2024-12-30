import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './config/swagger.js'
import { PORT } from './utils/const.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

// Ruta de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' })
})

app.listen(PORT, () => {
  console.log(`Servidor running en http://localhost:${PORT}`)
})

export default app
