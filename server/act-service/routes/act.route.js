import express from 'express'
import usersController from '../controller/act.controller.js'

const router = express.Router()

/**
 * @swagger
 * /activities:
 *   get:
 *     summary: Obtiene todas las actividades
 *     tags: [Actividades]
 *     responses:
 *       200:
 *         description: Lista de actividades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *       500:
 *         description: Error al obtener las actividades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener las actividades
 */
router.get('/', usersController.getActivities)

/**
 * @swagger
 * /activities/{id}:
 *   get:
 *     summary: Obtiene las actividades de un usuario por su ID
 *     tags: [Actividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *         example: 42
 *     responses:
 *       200:
 *         description: Actividades del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *       500:
 *         description: Error al obtener las actividades del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener las actividades del usuario
 */
router.get('/:id', usersController.getActivitiesById)

/**
 * @swagger
 * /activities:
 *   post:
 *     summary: Añade una nueva actividad
 *     tags: [Actividades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_user:
 *                 type: integer
 *                 description: ID del usuario
 *                 example: 42
 *               activity:
 *                 type: object
 *                 properties:
 *                   id_ruta:
 *                     type: string
 *                     description: ID de la ruta
 *                     example: "64f8a6a3c12b0c456789abcd"
 *                   nameRoute:
 *                     type: string
 *                     example: "Ruta de montaña"
 *                   distancia:
 *                     type: number
 *                     example: 25.3
 *                   tiempoMovimiento:
 *                     type: number
 *                     example: 120
 *                   velocidadMedia:
 *                     type: number
 *                     example: 12.5
 *                   potenciaMedia:
 *                     type: number
 *                     example: 200
 *                   potenciaMaxima:
 *                     type: number
 *                     example: 400
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-09-07T10:00:00Z"
 *                   desnivelPositivo:
 *                     type: number
 *                     example: 350
 *                   desnivelNegativo:
 *                     type: number
 *                     example: 300
 *     responses:
 *       201:
 *         description: Actividad creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       500:
 *         description: Error al crear la actividad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al crear la actividad
 */
router.post('/', usersController.addActivity)

/**
 * @swagger
 * /activities/{id}:
 *   delete:
 *     summary: Elimina una actividad por su ID
 *     tags: [Actividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la actividad a eliminar
 *         example: 101
 *     responses:
 *       200:
 *         description: Actividad eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Actividad eliminada correctamente
 *       404:
 *         description: Actividad no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Actividad no encontrada
 *       500:
 *         description: Error al eliminar la actividad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al eliminar la actividad
 */
router.delete('/:id', usersController.deleteActivity)

export default router
