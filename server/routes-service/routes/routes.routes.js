import express from 'express'
import routesController from '../controller/routes.controller.js'

const router = express.Router()

router.get('/', routesController.getRoutes)
router.post('/', routesController.addRoute)
router.get('/:id', routesController.getRoutesById)
router.get('/calculate', routesController.calculateRoute)
router.get('/locations', routesController.getLocations)
router.get('/elevation', routesController.getElevation)

export default router
