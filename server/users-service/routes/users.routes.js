import express from 'express'
import usersController from '../controller/users.controller.js'
import validateRegisterData from '../middleware/usersValidators.js'

const router = express.Router()

/**
 * @swagger
 * /users/new:
 *   post:
 *     summary: New user registration
 *     description: Endpoint to register a new user in Veloway.
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
 *                 description: Nickname user.
 *                 example: veloMaster
 *               email:
 *                 type: string
 *                 description: Email user.
 *                 format: email
 *                 example: john.doe@example.com
 *               photo:
 *                 type: string
 *                 description: URL photo.
 *                 example: ''
 *               password:
 *                 type: string
 *                 description: Password user.
 *                 format: password
 *                 example: securePassword123
 *               level:
 *                 type: string
 *                 description: User experience level.
 *                 enum: [beginner, intermediate, advanced]
 *                 example: beginner
 *     responses:
 *       201:
 *         description: User created successfully
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
 *                       example: veloMaster
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     photo:
 *                       type: string
 *                       example: ''
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
 *         description: User creation server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error creating user
 */
router.post('/new', validateRegisterData, usersController.newUser)

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Return a list of all users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: user ID
 *                     example: 1
 *                   nickname:
 *                     type: string
 *                     description: User nickname
 *                     example: veloMaster
 *                   email:
 *                     type: string
 *                     description: User email
 *                     example: john.doe@example.com
 *                   photo:
 *                     type: string
 *                     description: URL photo
 *                     example: "https://example.com/photo.jpg"
 *                   level:
 *                     type: string
 *                     description: User level (beginner, intermediate, advanced)
 *                     example: beginner
 *       500:
 *         description: Server internal error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Server internal error"
 */
router.get('/', usersController.listUsers)

/**
 * @swagger
 * /users/{nickname}:
 *   get:
 *     summary: Get user by nickname
 *     description: Returns the information about a user by nickname.
 *     tags: [Users]
 *     parameters:
 *       - name: nickname
 *         in: path
 *         required: true
 *         description: User nickname to search.
 *         schema:
 *           type: string
 *           example: veloMaster
 *     responses:
 *       200:
 *         description: User information obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: User ID
 *                   example: 1
 *                 nickname:
 *                   type: string
 *                   description: User nickname
 *                   example: veloMaster
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                   example: john.doe@example.com
 *                 photo:
 *                   type: string
 *                   description: URL de la foto de perfil del usuario
 *                   example: "https://example.com/photo.jpg"
 *                 level:
 *                   type: string
 *                   description: User level (beginner, intermediate, advanced)
 *                   example: beginner
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Server internal error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Server internal error"
 */
router.get('/:nickname', usersController.getUserByNickname)

/**
 * @swagger
 * /users/validate:
 *   post:
 *     summary: Validate a user
 *     description: Validates a user by checking if the provided nickname and password are correct.
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
 *                 description: The nickname of the user.
 *                 example: "veloMaster"
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: User validated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User validated successfully
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not find
 *       401:
 *         description: Invalid password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid password
 *       500:
 *         description: Server error while validating user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error validating user
 */
router.post('/validate', usersController.validetaUser)

/**
 * @swagger
 * /user/{nickname}:
 *   delete:
 *     summary: Eliminar un usuario por su nickname
 *     description: Elimina un usuario de la base de datos basado en su nickname.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: nickname
 *         in: path
 *         required: true
 *         description: Nickname del usuario a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor al eliminar el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error eliminando usuario
 */
router.delete('/:nickname', usersController.deleteUser)

router.post('/favRoutes/new', usersController.addFavRoute)

router.delete('/favRoutes/remove', usersController.removeFavouriteRoute)

router.get('/favRoutes/:idUser', usersController.getFavouriteRoutesByUser)

export default router
