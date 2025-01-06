import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './config/swagger.js'
import cors from 'cors'
import sequelize from './config/database.js'
import { PORT } from './utils/const.js'

import usersRoutes from './routes/users.routes.js'

const app = express()
app.use(express.json())
app.use(cors())

// Ruta de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/users', usersRoutes)

try {
  await sequelize.sync()
  console.log('Connection has been established successfully.')
  app.listen(PORT, () => {
    console.log(`Servidor running en http://localhost:${PORT}`)
  })
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

export default app
