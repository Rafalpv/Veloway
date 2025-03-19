import express from 'express'
import routesController from '../controller/routes.controller.js'

const router = express.Router()

router.get('/', routesController.calculateRoute)
router.get('/locations', routesController.getLocations)

export default router
