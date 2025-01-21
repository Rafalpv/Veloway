import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './shared/config/swagger.js'
import cors from 'cors'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { PORT } from './shared/utils/const.js'

const app = express()

app.use(express.json({ limit: '10mb' })) 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/users', createProxyMiddleware({
  target: 'http://localhost:4000',
  changeOrigin: true,
  timeout: 5000,
  proxyTimeout: 5000,
  pathRewrite: { '^/users': '' },
  on: {
    proxyReq: (proxyReq, req, res) => {
      const bodyData = JSON.stringify(req.body)
      proxyReq.setHeader('Content-Type', 'application/json')
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
      proxyReq.write(bodyData)
    }
  },
  logger: console
}))

app.use('/auth', createProxyMiddleware({
  target: 'http://localhost:5000',
  changeOrigin: true,
  timeout: 5000,
  proxyTimeout: 5000,
  pathRewrite: { '^/auth': '' },
  on: {
    proxyReq: (proxyReq, req, res) => {
      const bodyData = JSON.stringify(req.body)
      proxyReq.setHeader('Content-Type', 'application/json')
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
      proxyReq.write(bodyData)
    }
  },
  logger: console
}))

app.listen(PORT, () => {
  console.log(`API Gateway corriendo en http://localhost:${PORT}`)
})
