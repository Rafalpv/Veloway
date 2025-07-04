import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './config/swagger.js'
import cors from 'cors'
import { createProxyMiddleware } from 'http-proxy-middleware'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json({ limit: '10mb' }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(
  cors({
    origin: process.env.URL_BASE_FRONTEND,
    credentials: true
  })
)

app.use('/users', createProxyMiddleware({
  target: process.env.URL_BASE_USERS_SERVICE,
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
  target: process.env.URL_BASE_AUTH_SERVICE,
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

app.use('/routes', createProxyMiddleware({
  target: process.env.URL_BASE_ROUTES_SERVICE,
  changeOrigin: true,
  timeout: 5000,
  proxyTimeout: 5000,
  pathRewrite: { '^/routes': '' },
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

app.use('/act', createProxyMiddleware({
  target: process.env.URL_BASE_ACT_SERVICE,
  changeOrigin: true,
  timeout: 5000,
  proxyTimeout: 5000,
  pathRewrite: { '^/act': '' },
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

app.listen(process.env.PORT, () => {
  console.log(`API Gateway corriendo en http://localhost:${process.env.PORT}`)
})
