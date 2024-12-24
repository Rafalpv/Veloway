import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './src/config/swagger.js'
import { PORT } from './src/config/const.js'

const app = express()
app.use(express.json())

// Ruta de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(PORT, () => {
  console.log(`Servidor running en http://localhost:${PORT}`)
})

export default app
