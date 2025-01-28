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

router.get('/check-auth', verifyToken, (req, res) => {
  res.json({
    auth: true,
    nickname: req.nickname
  })
})

router.get('/logout', (req, res) => {
  res.clearCookie('authToken', { httpOnly: true, path: '/' }).json({ message: 'User logged out' })
})

export default router
