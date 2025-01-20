import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './shared/config/swagger.js'
import cors from 'cors'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { PORT } from './shared/utils/const.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/users', createProxyMiddleware({
  target: 'http://localhost:4000',
  changeOrigin: true,
  timeout: 5000,
  proxyTimeout: 5000,
  pathRewrite: { '^/users': '' }
}))

app.use('/auth', createProxyMiddleware({
  target: 'http://localhost:5000',
  changeOrigin: true
}))

app.listen(PORT, () => {
  console.log(`API Gateway corriendo en http://localhost:${PORT}`)
})
