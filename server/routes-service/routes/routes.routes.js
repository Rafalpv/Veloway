import express from 'express'
import routesController from '../controller/routes.controller.js'

const router = express.Router()

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene todas las rutas
 *     tags: [Rutas]
 *     responses:
 *       200:
 *         description: Rutas obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rutas obtenidas correctamente
 *                 routes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Route'
 *       404:
 *         description: No se encontraron rutas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se encontraron rutas
 *       500:
 *         description: Hubo un error en el servidor al obtener las rutas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hubo un error al obtener las rutas
 *                 error:
 *                   type: string
 */
router.get('/', routesController.getRoutes)

/**
 * @swagger
 * /:
 *   post:
 *     summary: Crea una nueva ruta
 *     tags: [Rutas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               routeName:
 *                 type: string
 *                 description: Nombre de la ruta
 *                 example: "Ruta de montaña"
 *               privacity:
 *                 type: string
 *                 description: Privacidad de la ruta
 *                 enum: [public, private]
 *                 default: public
 *                 example: "public"
 *               owner:
 *                 type: string
 *                 description: ID del usuario propietario de la ruta
 *                 example: "64f8a6a3c12b0c456789abcd"
 *               route:
 *                 type: object
 *                 properties:
 *                   markers:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         lat:
 *                           type: number
 *                           example: 37.7749
 *                         lng:
 *                           type: number
 *                           example: -122.4194
 *                   distance:
 *                     type: number
 *                     description: Distancia total en kilómetros
 *                     example: 25.3
 *                   time:
 *                     type: number
 *                     description: Tiempo estimado en minutos
 *                     example: 120
 *                   steps:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Inicio", "Subida", "Mirador", "Final"]
 *                   polyline:
 *                     type: string
 *                     description: Polilínea codificada de la ruta
 *                     example: "abc123encodedpolyline"
 *                   elevation:
 *                     type: number
 *                     description: Ganancia de elevación en metros
 *                     example: 350
 *                   isRoundTrip:
 *                     type: boolean
 *                     description: Indica si la ruta es de ida y vuelta
 *                     example: true
 *     responses:
 *       201:
 *         description: Ruta guardada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ruta guardada correctamente
 *                 route:
 *                   $ref: '#/components/schemas/Route'
 *       500:
 *         description: Hubo un error al guardar la ruta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hubo un error al guardar la ruta
 *                 error:
 *                   type: string
 */
router.post('/', routesController.addRoute)

/**
 * @swagger
 * /community/{id}:
 *   get:
 *     summary: Obtiene las rutas públicas de la comunidad (excluyendo las del usuario indicado)
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario para excluir sus rutas
 *         example: 123
 *     responses:
 *       200:
 *         description: Rutas públicas obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 routes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Route'
 *       500:
 *         description: Error al obtener rutas de la comunidad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener rutas de la comunidad
 *                 error:
 *                   type: string
 */
router.get('/community/:id', routesController.getCommunityRoutes)

/**
 * @swagger
 * /calculate:
 *   get:
 *     summary: Calcula una ruta ciclista usando la API de Google Directions
 *     tags: [Rutas]
 *     parameters:
 *       - in: query
 *         name: origin
 *         required: true
 *         schema:
 *           type: string
 *         description: Punto de origen de la ruta (coordenadas o dirección)
 *         example: "40.4168,-3.7038"
 *       - in: query
 *         name: destination
 *         required: true
 *         schema:
 *           type: string
 *         description: Punto de destino de la ruta (coordenadas o dirección)
 *         example: "40.4379,-3.6793"
 *       - in: query
 *         name: waypoints
 *         required: false
 *         schema:
 *           type: string
 *         description: Puntos intermedios separados por `|`
 *         example: "40.4230,-3.6990|40.4280,-3.6900"
 *     responses:
 *       200:
 *         description: Respuesta de la API de Google Directions con la ruta calculada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 geocoded_waypoints:
 *                   type: array
 *                   description: Información de los puntos geocodificados
 *                 routes:
 *                   type: array
 *                   description: Posibles rutas encontradas
 *                 status:
 *                   type: string
 *                   example: "OK"
 *       500:
 *         description: Error al calcular la ruta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "La clave de API no es válida o ha caducado"
 */
router.get('/calculate', routesController.calculateRoute)

/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Obtiene sugerencias de ubicaciones usando la API de Google Places
 *     tags: [Rutas]
 *     parameters:
 *       - in: query
 *         name: ubication
 *         required: true
 *         schema:
 *           type: string
 *         description: Texto de búsqueda de la ubicación
 *         example: "Madrid"
 *     responses:
 *       200:
 *         description: Lista de sugerencias de ubicaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Nombre o descripción de la ubicación
 *                     example: "Madrid, España"
 *                   lat:
 *                     type: number
 *                     description: Latitud de la ubicación
 *                     example: 40.4168
 *                   lon:
 *                     type: number
 *                     description: Longitud de la ubicación
 *                     example: -3.7038
 *       500:
 *         description: Error al obtener las sugerencias de ubicaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "La clave de API no es válida o ha caducado"
 */
router.get('/locations', routesController.getLocations)

/**
 * @swagger
 * /elevation:
 *   get:
 *     summary: Obtiene datos de elevación para una ruta usando la API de Google Elevation
 *     tags: [Rutas]
 *     parameters:
 *       - in: query
 *         name: positions
 *         required: true
 *         schema:
 *           type: string
 *         description: Array JSON de coordenadas en formato [[lat, lng], [lat2, lng2], ...]
 *         example: "[[40.4168, -3.7038], [40.4379, -3.6793]]"
 *       - in: query
 *         name: samples
 *         required: false
 *         schema:
 *           type: integer
 *           default: 100
 *         description: Número de muestras de elevación a tomar a lo largo del camino
 *         example: 50
 *     responses:
 *       200:
 *         description: Elevaciones obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 elevations:
 *                   type: array
 *                   items:
 *                     type: number
 *                   example: [667.3, 672.8, 681.1, 695.2]
 *       400:
 *         description: Faltan parámetros obligatorios en la petición
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Debes enviar un array de coordenadas
 *       500:
 *         description: Error al obtener datos de elevación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener elevación
 */
router.get('/elevation', routesController.getElevation)

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Obtiene todas las rutas creadas por un usuario específico
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del creador de las rutas
 *         example: 42
 *     responses:
 *       200:
 *         description: Rutas obtenidas correctamente para el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rutas encontradas
 *                 routes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Route'
 *       400:
 *         description: El ID proporcionado no es válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ID de creador no válido
 *       500:
 *         description: Error interno al obtener rutas del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hubo un error al obtener la ruta por su ID
 *                 error:
 *                   type: string
 */
router.get('/user/:id', routesController.getRoutesPerUser)

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Elimina una ruta por su ID
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la ruta a eliminar (ObjectId de MongoDB)
 *         example: 64f8a6a3c12b0c456789abcd
 *     responses:
 *       200:
 *         description: Ruta eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ruta eliminada correctamente
 *                 route:
 *                   $ref: '#/components/schemas/Route'
 *       400:
 *         description: ID no válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ID no válido
 *       404:
 *         description: Ruta no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ruta no encontrada
 *       500:
 *         description: Error interno al eliminar la ruta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hubo un error al eliminar la ruta
 *                 error:
 *                   type: string
 */
router.delete('/:id', routesController.deleteRoute)

/**
 * @swagger
 * /:id
 *   post:
 *     summary: Obtiene una ruta por su ID
 *     tags: [Rutas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID de la ruta a consultar (ObjectId de MongoDB)
 *                 example: 64f8a6a3c12b0c456789abcd
 *     responses:
 *       200:
 *         description: Ruta encontrada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ruta encontrada
 *                 route:
 *                   $ref: '#/components/schemas/Route'
 *       400:
 *         description: ID no válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ID no válido
 *       404:
 *         description: Ruta no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ruta no encontrada
 *       500:
 *         description: Error interno al obtener la ruta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hubo un error al obtener la ruta por su ID
 *                 error:
 *                   type: string
 */
router.get('/:id', routesController.getRoutesById)

/**
 * @swagger
 * /multiple:
 *   post:
 *     summary: Obtiene varias rutas por un array de IDs
 *     tags: [Rutas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 description: Array de IDs de rutas (ObjectId de MongoDB)
 *                 items:
 *                   type: string
 *                 example: ["64f8a6a3c12b0c456789abcd", "64f8a6a3c12b0c456789abce"]
 *     responses:
 *       200:
 *         description: Rutas encontradas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rutas encontradas
 *                 routes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Route'
 *       400:
 *         description: IDs inválidos o array vacío
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Se requiere un array de IDs
 *       500:
 *         description: Error interno al obtener las rutas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hubo un error al obtener las rutas por sus IDs
 *                 error:
 *                   type: string
 */

router.post('/multiple', routesController.getRoutesByIds)
/**
 * @swagger
 * /routes/talkToChat:
 *   post:
 *     summary: Generar ruta ciclista
 *     description: >
 *       Recibe un mensaje del usuario y devuelve una ruta ciclista en formato JSON
 *       con coordenadas realistas en España.
 *       El servicio utiliza un modelo de IA para diseñar rutas seguras y coherentes.
 *     tags:
 *       - Rutas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Diseña una ruta ciclista en Granada"
 *     responses:
 *       200:
 *         description: Respuesta con la ruta ciclista
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reply:
 *                   type: string
 *                   description: Texto explicativo para el usuario
 *                   example: "Ruta diseñada en Granada con salida en el centro histórico."
 *                 locations:
 *                   type: array
 *                   description: Lista de puntos de la ruta (latitud/longitud)
 *                   items:
 *                     type: object
 *                     properties:
 *                       lat:
 *                         type: number
 *                         example: 37.1761
 *                       lng:
 *                         type: number
 *                         example: -3.5976
 *       500:
 *         description: Error interno en el servidor
 */
router.post('/talkToChat', routesController.talkToChat)

export default router
