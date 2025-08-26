import express from 'express'
import usersController from '../controller/act.controller.js'

const router = express.Router()

router.get('/', usersController.getActivities)
router.get('/:id', usersController.getActivitiesById)
router.post('/', usersController.addActivity)
router.delete('/:id', usersController.deleteActivity)

export default router
