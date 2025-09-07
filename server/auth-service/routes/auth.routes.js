import express from 'express'
import authController from '../controller/auth.controller.js'
import verifyToken from '../middleware/authMiddleware.js'
import validateLoginInput from '../middleware/validator/validators.js'

const router = express.Router()

// POST
// http://localhost:3000/auth/login -> http://localhost:5000/login
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in and sets a cookie with the authentication token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nickname
 *               - password
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: The user's nickname.
 *                 example: veloMaster
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: securePassword123
 *     responses:
 *       200:
 *         description: Login successful. A message is returned, and a cookie with the authentication token is set.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: User login successful
 *       400:
 *        description: Missing nickname or password.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Missing nickname or password
 *       401:
 *         description: Invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Authentication error message.
 *                   example: Invalid password
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message when the user does not exist.
 *                   example: User not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Server error message.
 *                   example: Error during login process
 */
router.post('/login', validateLoginInput, authController.userLogin)

/**
 * @swagger
 * /check-auth:
 *   get:
 *     summary: Verifica si el usuario está autenticado
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   description: Información del usuario autenticado
 *                   example:
 *                     id: "64f8a6a3c12b0c456789abcd"
 *                     email: "usuario@example.com"
 *                     name: "Juan Pérez"
 *       401:
 *         description: Usuario no autenticado o token inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Token inválido o expirado
 */
router.get('/check-auth', verifyToken, (req, res) => {
  res.json({
    auth: true,
    user: req.user
  })
})

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Cierra la sesión del usuario
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Usuario desconectado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User logged out
 */
router.get('/logout', (req, res) => {
  res.clearCookie('authToken', { httpOnly: true, path: '/' }).json({ message: 'User logged out' })
})

export default router
