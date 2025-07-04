import express from 'express'
import usersController from '../controller/act.controller.js'

const router = express.Router()

router.get('/', usersController.getActivities)

export default router
