import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './shared/config/swagger.js'
import cors from 'cors'
import { PORT } from './shared/utils/const.js'

import usersRoutes from './users-service/routes/users.routes.js'

// CONFIGURACION DE EXPRESS
const app = express()
app.use(express.json())
app.use(cors())

// GESTION DE RUTAS
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/users', usersRoutes)

try {
  app.listen(PORT, () => {
    console.log(`Servidor running en http://localhost:${PORT}`)
  })
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

export default app
