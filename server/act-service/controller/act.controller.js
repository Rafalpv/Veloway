/* eslint-disable camelcase */
import Activity from '../models/Activity.js'

// Obtener todas las actividades
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll()
    res.status(200).json(activities)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener las actividades' })
  }
}

// Obtener actividades de un usuario por su ID
const getActivitiesById = async (req, res) => {
  const { id } = req.params

  try {
    const activities = await Activity.findAll({
      where: { id_user: id }
    })

    res.status(200).json(activities)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener las actividades del usuario' })
  }
}

// Añadir una actividad
const addActivity = async (req, res) => {
  const { activity, id_user } = req.body

  try {
    const newActivity = await Activity.create({
      id_user,
      id_ruta: activity.id_ruta,
      nameRoute: activity.nameRoute,
      distancia: activity.distancia,
      tiempoMovimiento: activity.tiempoMovimiento,
      velocidadMedia: activity.velocidadMedia,
      potenciaMedia: activity.potenciaMedia,
      potenciaMaxima: activity.potenciaMaxima,
      fecha: activity.fecha,
      desnivelPositivo: activity.desnivelPositivo,
      desnivelNegativo: activity.desnivelNegativo
    })

    res.status(201).json(newActivity)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al crear la actividad' })
  }
}

// Delete a route
const deleteActivity = async (req, res) => {
  const { id } = req.params

  try {
    const deletedActivity = await Activity.destroy({
      where: { id }
    })

    if (deletedActivity) {
      res.status(200).json({ message: 'Actividad eliminada correctamente' })
    } else {
      res.status(404).json({ message: 'Actividad no encontrada' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al eliminar la actividad' })
  }
}

export default {
  getActivities,
  getActivitiesById,
  addActivity,
  deleteActivity
}
