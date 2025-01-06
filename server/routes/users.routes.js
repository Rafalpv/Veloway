import express from 'express'
import userController from '../controller/user.controller.js'

const router = express.Router()

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario.
 *     description: Endpoint para registrar un nuevo usuario en el sistema Veloway.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: Nombre único de usuario.
 *                 example: velo_master
 *               name:
 *                 type: string
 *                 description: Nombre del usuario.
 *                 example: John
 *               lastname:
 *                 type: string
 *                 description: Apellido del usuario.
 *                 example: Doe
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *                 format: email
 *                 example: john.doe@example.com
 *               photo:
 *                 type: string
 *                 description: URL de la foto de perfil.
 *                 example: https://example.com/profile.jpg
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 format: password
 *                 example: securePassword123
 *               privacy:
 *                 type: string
 *                 description: Configuración de privacidad del usuario (e.g., pública o privada).
 *                 enum: [public, private]
 *                 example: private
 *               level:
 *                 type: string
 *                 description: Nivel de experiencia del usuario.
 *                 enum: [beginner, intermediate, advanced]
 *                 example: beginner
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 User:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nickname:
 *                       type: string
 *                       example: velo_master
 *                     name:
 *                       type: string
 *                       example: John
 *                     lastname:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     photo:
 *                       type: string
 *                       example: https://example.com/profile.jpg
 *                     privacy:
 *                       type: string
 *                       example: private
 *                     level:
 *                       type: string
 *                       example: beginner
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-01-05T12:00:00Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-01-05T12:00:00Z
 *       500:
 *         description: Error en el servidor al crear el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error creating user
 */
router.post('/new', userController.newUser)

export default router
