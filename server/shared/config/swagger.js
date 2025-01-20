import swaggerJSDoc from 'swagger-jsdoc'

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Rutas',
      version: '1.0.0',
      description: 'Documentación de la API para la gestión de rutas',
      contact: {
        name: 'Rafa Luque',
        email: 'rafaluperezvico@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ]
  },
  apis: ['../**/routes/*.js'] // Ruta a los archivos donde defines tus endpoints
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export default swaggerDocs
