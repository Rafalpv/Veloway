import express from 'express'
import authController from '../controller/auth.controller.js'
import verifyToken from '../../shared/middleware/authMiddleware.js'

const router = express.Router()

// POST
// http://localhost:3000/auth/login -> http://localhost:5000/login
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión y obtiene un token de autenticación
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: Nombre de usuario del usuario
 *                 example: veloMaster
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: securePassword123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, se devuelve el token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticación generado
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid password
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error during login process
 */
router.post('/login', authController.userLogin)

router.get('/check-auth', verifyToken, (req, res) => {
  res.json({ auth: true })
})

export default router
