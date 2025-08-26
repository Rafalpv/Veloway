import express from 'express'
import routesController from '../controller/routes.controller.js'

const router = express.Router()

router.get('/', routesController.getRoutes)
router.post('/', routesController.addRoute)
router.get('/community/:id', routesController.getCommunityRoutes)
router.get('/calculate', routesController.calculateRoute)
router.get('/locations', routesController.getLocations)
router.get('/elevation', routesController.getElevation)
router.get('/user/:id', routesController.getRoutesPerUser)
router.delete('/:id', routesController.deleteRoute)
router.get('/:id', routesController.getRoutesById)
router.post('/multiple', routesController.getRoutesByIds)
/**
 * @swagger
 * /routes/chat:
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
router.post('/chat', routesController.talkToChat)

export default router
